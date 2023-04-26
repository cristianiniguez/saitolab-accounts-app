import { ApiProperty, PartialType } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Salary March', required: true })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({ example: 1000, minimum: 0, required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '2023-03-01', required: true })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ enum: MoveType, required: true })
  @IsString()
  @IsIn([MoveType.INCOME, MoveType.OUTCOME])
  @IsNotEmpty()
  type: MoveType;

  @ApiProperty({ example: 1, required: true })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  accountId: number;
}

export class UpdateMoveDTO extends PartialType(CreateMoveDTO) {}
