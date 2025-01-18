import { Controller, Get, Post, Body, Param, Req, Query } from '@nestjs/common';
import { ForumQuestionsService } from './forum_questions.service';
import { CreateForumQuestionDto } from './dto/create-forum_question.dto';
import { CreateCommentForumQuestionsDto } from './dto/create-comment-forum_question.dto';
import { FindManySharedDto } from 'src/utils/dto/find-many.dto';

@Controller('forum-questions')
export class ForumQuestionsController {
  constructor(private readonly forumQuestionsService: ForumQuestionsService) {}

  @Post()
  create(@Body() createForumQuestionDto: CreateForumQuestionDto, @Req() req) {
    return this.forumQuestionsService.create({
      ...createForumQuestionDto,
      userId: req.user.userId
    });
  }
  
  @Get()
  findMany(@Query() query: FindManySharedDto) {
    return this.forumQuestionsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumQuestionsService.findOne(id);
  }


  @Post(':id/comments')
  postComment(@Param('id') id: string, @Body() createForumQuestionDto: CreateCommentForumQuestionsDto, @Req() req) {
    return this.forumQuestionsService.postComment(id, {
      ...createForumQuestionDto,
      userId: req.user.userId
    });
  }

}
