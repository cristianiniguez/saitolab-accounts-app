import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateMoveDTO, UpdateMoveDTO } from '../dtos/moves.dto';
import { AccountsService } from './accounts.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MovesService {
  constructor(
    private dbService: DatabaseService,
    private readonly accountsService: AccountsService,
  ) {}

  async findOne(id: number, user: User) {
    const move = await this.dbService.move.findFirst({
      include: { account: true },
      where: { account: { userId: user.id }, id },
    });

    // the move should exist
    if (!move) throw new NotFoundException(`Move with id ${id} not found`);

    return move;
  }

  async create(data: CreateMoveDTO, user: User) {
    const { account, date, ...rest } = data;
    const savedAccount = await this.accountsService.findOne(account, user);
    return this.dbService.move.create({
      data: { ...rest, accountId: savedAccount.id, date: new Date(date) },
    });
  }

  async update(id: number, data: UpdateMoveDTO, user: User) {
    const { account, date, ...rest } = data;
    const move = await this.findOne(id, user);

    const moveDate = date ? new Date(date) : undefined;
    const payload = { ...rest, date: moveDate };

    if (!account)
      return this.dbService.move.update({
        data: payload,
        where: { id: move.id },
      });

    const savedAccount = await this.accountsService.findOne(account, user);

    return this.dbService.move.update({
      data: { ...payload, accountId: savedAccount.id },
      where: { id: move.id },
    });
  }

  async remove(id: number, user: User) {
    const move = await this.findOne(id, user);
    return this.dbService.move.delete({ where: { id: move.id } });
  }
}
