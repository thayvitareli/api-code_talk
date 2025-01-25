import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { ChatRoomRepository } from './repositories/chat-room.repository';
import { MessageRepository } from './repositories/message.repository';
import { UserChatRoomRepository } from './repositories/subscribe-chat-room.repository';
import { ForumQuestionRepository } from './repositories/forum-question.repository';
import { CommentRepository } from './repositories/comments.repository';
import { TechnologyTagRepository } from './repositories/technology-tag.repository';

@Module({
  exports: [
    UserRepository,
    UserChatRoomRepository,
    ChatRoomRepository,
    MessageRepository,
    ForumQuestionRepository,
    CommentRepository,
    TechnologyTagRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    UserChatRoomRepository,
    ChatRoomRepository,
    MessageRepository,
    ForumQuestionRepository,
    CommentRepository,
    TechnologyTagRepository,
  ],
})
export class DatabaseModule {}
