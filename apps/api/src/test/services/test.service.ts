import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TestService {
  constructor(private dbService: DatabaseService) {}

  async deleteUsers() {
    const users = await this.dbService.user.findMany();
    return Promise.all(
      users.map((user) =>
        this.dbService.user.delete({ where: { id: user.id } }),
      ),
    );
  }

  async deleteAccounts() {
    const accounts = await this.dbService.account.findMany();
    return Promise.all(
      accounts.map((account) =>
        this.dbService.account.delete({ where: { id: account.id } }),
      ),
    );
  }

  async deleteMoves() {
    const moves = await this.dbService.move.findMany();
    return Promise.all(
      moves.map((move) =>
        this.dbService.move.delete({ where: { id: move.id } }),
      ),
    );
  }
}
