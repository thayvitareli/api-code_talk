import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import errorMessages from 'src/utils/errorMessages';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ email, name, password }: CreateUserDto) {
    const emailInUse = await this.userRepository.findOne({
      email,
    });

    if (emailInUse) {
      throw new BadRequestException(errorMessages.emailInUse);
    }

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    delete newUser['password'];

    return newUser;
  }
}
