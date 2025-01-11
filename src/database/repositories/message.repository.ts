import { Injectable } from '@nestjs/common';
import { message, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.messageCreateInput): Promise<message> {
    return this.prisma.message.create({
      data,
    });
  }

  async findMany(where?: Prisma.messageWhereInput): Promise<message[]> {
    return this.prisma.message.findMany({
      where,
    });
  }
}
