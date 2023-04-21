import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@prisma/client';

import { removePassword } from 'src/utils';
import { AuthService } from '../services/auth.service';
import { SignUpDTO } from '../dtos/signup.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() data: SignUpDTO) {
    return this.authService.createUser(data);
  }

  @Post('sign-in')
  @UseGuards(AuthGuard('basic'))
  signIn(@Req() req: Request) {
    return this.authService.generateJWT(req.user as User);
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  check(@Req() req: Request) {
    return removePassword(req.user as User);
  }
}
