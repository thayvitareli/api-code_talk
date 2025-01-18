import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateForumQuestionDto } from './dto/create-forum_question.dto';
import { CreateCommentForumQuestionsDto } from './dto/create-comment-forum_question.dto';
import { ForumQuestionRepository } from 'src/database/repositories/forum-question.repository';
import errorMessages from 'src/utils/errorMessages';
import { CommentRepository } from 'src/database/repositories/comments.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ForumQuestionsService {
  constructor (private readonly forumQuestionRepository: ForumQuestionRepository,
    private readonly commentRepository: CommentRepository
  ){}
  
  async create({ content, title,  userId}: CreateForumQuestionDto) {
    return await this.forumQuestionRepository.create({
      content,
      title,
      user: { connect: {id: userId}}
      
    });
  }


  async postComment(id: string, { content,  userId}: CreateCommentForumQuestionsDto) {
    const forum = await this.forumQuestionRepository.findOne({
      id
    })

    if(!forum) throw new NotFoundException(errorMessages.forumNotFount)


    return await this.commentRepository.create({
      content,
      user: { connect: {id: userId}},
      forum_question: {
        connect: { id} 
      }
      
    });
  }

 async findOne(id: string) {
  const select: Prisma.forum_questionsSelect = {
    id:true,
    title:true,
    content:true,
    question_technologies_tags: true,
    comments:true,
    user: {
      select: {
        name: true,
      }
    },
    created_at:true,
  }
    const forum = await this.forumQuestionRepository.findOne({
      id,
      
    }, select)

    if(!forum) throw new NotFoundException(errorMessages.forumNotFount)

    return forum;
  }

  
}
