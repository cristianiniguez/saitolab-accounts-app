import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsController } from './controllers/accounts.controller';
import { MovesController } from './controllers/moves.controller';
import { AccountsService } from './services/accounts.service';
import { MovesService } from './services/moves.service';
import { Account } from './entities/account.entity';
import { Move } from './entities/move.entity';

@Module({
  controllers: [AccountsController, MovesController],
  imports: [TypeOrmModule.forFeature([Account, Move])],
  providers: [AccountsService, MovesService],
})
export class AccountsModule {}
