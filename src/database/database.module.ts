import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { SubscribeChatRoomRepository } from './repositories/subscribe-chat-room.repository';
import { ChatRoomRepository } from './repositories/chat-room.repository';
import { MessageRepository } from './repositories/message.repository';

@Module({
  exports: [
    UserRepository,
    SubscribeChatRoomRepository,
    ChatRoomRepository,
    MessageRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    SubscribeChatRoomRepository,
    ChatRoomRepository,
    MessageRepository,
  ],
})
export class DatabaseModule {}
