import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateAccountDTO extends PartialType(CreateAccountDTO) {}
