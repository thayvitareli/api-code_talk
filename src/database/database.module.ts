import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { ChatRoomRepository } from './repositories/chat-room.repository';
import { MessageRepository } from './repositories/message.repository';
import { UserChatRoomRepository } from './repositories/subscribe-chat-room.repository';

@Module({
  exports: [
    UserRepository,
    UserChatRoomRepository,
    ChatRoomRepository,
    MessageRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    UserChatRoomRepository,
    ChatRoomRepository,
    MessageRepository,
  ],
})
export class DatabaseModule {}
