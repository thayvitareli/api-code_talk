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

  async findOne(where: Prisma.chat_roomWhereInput): Promise<chat_room> {
    return this.prisma.chat_room.findFirst({
      where,
    });
  }
}
