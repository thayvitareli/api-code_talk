import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { SubscribeChatRoomRepository } from './repositories/subscribe-chat-room.repository';
import { ChatRoomRepository } from './repositories/chat-room.repository';

@Module({
  exports: [UserRepository, SubscribeChatRoomRepository, ChatRoomRepository],
  providers: [
    PrismaService,
    UserRepository,
    SubscribeChatRoomRepository,
    ChatRoomRepository,
  ],
})
export class DatabaseModule {}
