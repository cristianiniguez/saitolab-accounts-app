import { Injectable, NotFoundException } from '@nestjs/common';
import { Move, User } from '@prisma/client';
import { CreateMoveDTO, UpdateMoveDTO } from '../dtos/moves.dto';
import { AccountsService } from './accounts.service';
import { DatabaseService } from 'src/database/database.service';
import { getDateStr } from 'src/utils';

@Injectable()
export class MovesService {
  constructor(
    private db: DatabaseService,
    private readonly accountsService: AccountsService,
  ) {}

  private normalizeMove = (move: Move) => {
    return {
      ...move,
      amount: move.amount.toNumber(),
      date: getDateStr(move.date),
    };
  };

  async findOne(id: number, user: User) {
    const move = await this.db.move.findFirst({
      include: { account: true },
      where: { account: { userId: user.id }, id },
    });

    // the move should exist
    if (!move) throw new NotFoundException(`Move with id ${id} not found`);

    return this.normalizeMove(move);
  }

  async create(data: CreateMoveDTO, user: User) {
    const { accountId, date, ...rest } = data;
    const savedAccount = await this.accountsService.findOne(accountId, user);
    const createdMove = await this.db.move.create({
      data: { ...rest, accountId: savedAccount.id, date: new Date(date) },
    });
    return this.normalizeMove(createdMove);
  }

  async update(id: number, data: UpdateMoveDTO, user: User) {
    const { accountId, date, ...rest } = data;
    const move = await this.findOne(id, user);

    const moveDate = date ? new Date(date) : undefined;
    const payload = { ...rest, date: moveDate };

    if (!accountId)
      return this.db.move.update({
        data: payload,
        where: { id: move.id },
      });

    // checking if account with accountId exists and is owned by the user
    const savedAccount = await this.accountsService.findOne(accountId, user);

    const updatedMove = await this.db.move.update({
      data: { ...payload, accountId: savedAccount.id },
      where: { id: move.id },
    });

    return this.normalizeMove(updatedMove);
  }

  async remove(id: number, user: User) {
    const move = await this.findOne(id, user);
    const deletedMove = await this.db.move.delete({
      where: { id: move.id },
    });
    return this.normalizeMove(deletedMove);
  }
}
