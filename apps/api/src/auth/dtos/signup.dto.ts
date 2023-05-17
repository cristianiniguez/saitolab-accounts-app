import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ example: 'jhon.doe@example.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'averystrongpassword$123', required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'Jhon', required: true })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', required: true })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
