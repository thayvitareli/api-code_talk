import { Injectable } from '@nestjs/common';
import { chat_room, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatRoomRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.chat_roomCreateInput): Promise<chat_room> {
    return this.prisma.chat_room.create({
      data,
    });
  }

  async findMany({where, skip,take}:{where?: Prisma.chat_roomWhereInput, skip:number, take:number}): Promise<chat_room[]> {
    return this.prisma.chat_room.findMany({
      where,
      skip,
      take
    });
  }

  async findOne(where: Prisma.chat_roomWhereInput): Promise<chat_room> {
    return this.prisma.chat_room.findFirst({
      where,
    });
  }

  async total(where?: Prisma.chat_roomWhereInput): Promise<number> {
    return this.prisma.chat_room.count({
      where,
    });
  }
}
