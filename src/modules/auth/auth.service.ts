import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/database/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import errorMessages from 'src/utils/errorMessages';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      if (bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException(errorMessages.loginFailed);
    }
    throw new UnauthorizedException(errorMessages.loginFailed);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
