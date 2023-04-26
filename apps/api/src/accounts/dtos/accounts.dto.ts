import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty({ example: 'Bank Account #1', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateAccountDTO extends PartialType(CreateAccountDTO) {}
