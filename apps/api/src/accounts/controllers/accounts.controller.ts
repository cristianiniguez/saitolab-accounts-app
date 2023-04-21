import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AccountsService } from '../services/accounts.service';
import { CreateAccountDTO, UpdateAccountDTO } from '../dtos/accounts.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
@ApiTags('Accounts')
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.accountsService.findAll(request.user as User);
  }

  @Get(':id')
  findOne(@Req() request: Request, @Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id, request.user as User);
  }

  @Post()
  create(@Req() request: Request, @Body() data: CreateAccountDTO) {
    return this.accountsService.create(data, request.user as User);
  }

  @Put(':id')
  update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAccountDTO,
  ) {
    return this.accountsService.update(id, data, request.user as User);
  }

  @Delete(':id')
  delete(@Req() request: Request, @Param('id', ParseIntPipe) id: number) {
    return this.accountsService.remove(id, request.user as User);
  }
}
