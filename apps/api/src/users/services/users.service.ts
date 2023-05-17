import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { removePassword } from 'src/utils';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async findOne(id: number) {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserDTO) {
    // email has to be unique
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) throw new BadRequestException('Email is already in use');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const savedUser = await this.db.user.create({
      data: { ...data, password: hashedPassword },
    });

    return removePassword(savedUser);
  }
}
