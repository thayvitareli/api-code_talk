import { Injectable } from '@nestjs/common';
import { users, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({
      data,
    });
  }

  async findOne(where: Prisma.usersWhereInput): Promise<users> {
    return this.prisma.users.findFirst({
      where,
    });
  }
}
