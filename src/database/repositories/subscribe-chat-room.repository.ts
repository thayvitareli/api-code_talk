import { Injectable } from '@nestjs/common';
import { user_chat_room_subscribe, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscribeChatRoomRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.user_chat_room_subscribeCreateInput,
  ): Promise<user_chat_room_subscribe> {
    return this.prisma.user_chat_room_subscribe.create({
      data,
    });
  }

  async findOne(
    where: Prisma.user_chat_room_subscribeWhereInput,
  ): Promise<user_chat_room_subscribe> {
    return this.prisma.user_chat_room_subscribe.findFirst({
      where,
    });
  }

  async delete(
    where: Prisma.user_chat_room_subscribeWhereUniqueInput,
  ): Promise<user_chat_room_subscribe> {
    return this.prisma.user_chat_room_subscribe.delete({ where });
  }
}
