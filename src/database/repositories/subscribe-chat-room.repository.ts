import { Injectable } from '@nestjs/common';
import { users_chat_rooms, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserChatRoomRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.users_chat_roomsCreateInput,
  ): Promise<users_chat_rooms> {
    return this.prisma.users_chat_rooms.create({
      data,
    });
  }

  async findOne(
    where: Prisma.users_chat_roomsWhereInput,
  ): Promise<users_chat_rooms> {
    return this.prisma.users_chat_rooms.findFirst({
      where,
    });
  }

  async delete(
    where: Prisma.users_chat_roomsWhereUniqueInput,
  ): Promise<users_chat_rooms> {
    return this.prisma.users_chat_rooms.delete({ where });
  }
}
