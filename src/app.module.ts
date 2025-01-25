import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { ChatRoomsModule } from './modules/chat_rooms/chat_rooms.module';
import { ForumQuestionsModule } from './modules/forum_questions/forum_questions.module';
import { TechnologiesTagModule } from './modules/technologies-tag/technologies-tag.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    ChatRoomsModule,
    ForumQuestionsModule,
    TechnologiesTagModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
