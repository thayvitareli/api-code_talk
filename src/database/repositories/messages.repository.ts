import { Injectable } from '@nestjs/common';
import { message, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.messageCreateInput): Promise<message> {
    return this.prisma.message.create({
      data,
    });
  }

  async findMany({
    where,
    skip,
    take,
    select,
  }: {
    where?: Prisma.messageWhereInput;
    skip: number;
    take: number;
    select?: Prisma.messageSelect;
  }): Promise<message[]> {
    return this.prisma.message.findMany({
      where,
      skip,
      take,
      select,
    });
  }



}
