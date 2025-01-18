import { Injectable } from '@nestjs/common';
import { messages, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.messagesCreateInput): Promise<messages> {
    return this.prisma.messages.create({
      data,
    });
  }

  async findMany({where, select}:{where?: Prisma.messagesWhereInput, select: Prisma.messagesSelect}): Promise<messages[]> {
    return this.prisma.messages.findMany({
      where,
      select
    });
  }
}
