import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsString()
  @IsIn([MoveType.INCOME, MoveType.OUTCOME])
  @IsNotEmpty()
  type: MoveType;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  accountId: number;
}

export class UpdateMoveDTO extends PartialType(CreateMoveDTO) {}
