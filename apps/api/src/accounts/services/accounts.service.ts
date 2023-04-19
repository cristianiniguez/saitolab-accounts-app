import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateAccountDTO, UpdateAccountDTO } from '../dtos/accounts.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountsService {
  constructor(private dbService: DatabaseService) {}

  findAll(user: User) {
    return this.dbService.account.findMany({
      where: { userId: user.id },
    });
  }

  async findOne(id: number, user: User) {
    const account = await this.dbService.account.findFirst({
      include: { moves: true },
      where: { id, userId: user.id },
    });

    if (!account)
      throw new NotFoundException(`Account with id ${id} not found`);

    return account;
  }

  async create(data: CreateAccountDTO, user: User) {
    return this.dbService.account.create({
      data: { ...data, userId: user.id },
    });
  }

  async update(id: number, data: UpdateAccountDTO, user: User) {
    const account = await this.findOne(id, user);
    return this.dbService.account.update({ data, where: { id: account.id } });
  }

  async remove(id: number, user: User) {
    const account = await this.findOne(id, user);
    return this.dbService.account.delete({ where: { id: account.id } });
  }
}
