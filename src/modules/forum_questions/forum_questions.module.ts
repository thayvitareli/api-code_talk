import { Module } from '@nestjs/common';
import { ForumQuestionsService } from './forum_questions.service';
import { ForumQuestionsController } from './forum_questions.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ForumQuestionsController],
  providers: [ForumQuestionsService],
})
export class ForumQuestionsModule {}
