import { Injectable } from '@nestjs/common';
import { chat_rooms, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatRoomRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.chat_roomsCreateInput): Promise<chat_rooms> {
    return this.prisma.chat_rooms.create({
      data,
    });
  }

  async findMany({
    where,
    skip,
    take,
    select,
  }: {
    where?: Prisma.chat_roomsWhereInput;
    skip: number;
    take: number;
    select?: Prisma.chat_roomsSelect;
  }): Promise<chat_rooms[]> {
    return this.prisma.chat_rooms.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async findOne(where: Prisma.chat_roomsWhereInput): Promise<chat_rooms> {
    return this.prisma.chat_rooms.findFirst({
      where,
    });
  }

  async total(where?: Prisma.chat_roomsWhereInput): Promise<number> {
    return this.prisma.chat_rooms.count({
      where,
    });
  }
}
