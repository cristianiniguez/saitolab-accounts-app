import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { MoveType } from '../models/move.model';

export class CreateMoveDTO {
  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsIn([MoveType.INCOME, MoveType.OUTCOME])
  @IsNotEmpty()
  type: MoveType;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  accountId: number;
}

export class UpdateMoveDTO extends PartialType(CreateMoveDTO) {}
