import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateForumQuestionDto } from './dto/create-forum_question.dto';
import { CreateCommentForumQuestionsDto } from './dto/create-comment-forum_question.dto';
import { ForumQuestionRepository } from 'src/database/repositories/forum-question.repository';
import errorMessages from 'src/utils/errorMessages';
import { CommentRepository } from 'src/database/repositories/comments.repository';
import { Prisma } from '@prisma/client';
import { FindManySharedDto } from 'src/utils/dto/find-many.dto';

@Injectable()
export class ForumQuestionsService {
  constructor (private readonly forumQuestionRepository: ForumQuestionRepository,
    private readonly commentRepository: CommentRepository
  ){}
  
  async create({ content, title,tagIds,  userId}: CreateForumQuestionDto) {
  
    return await this.forumQuestionRepository.create({
      content,
      title,
      user: { connect: {id: userId}},
      question_technologies_tags: {
        create: tagIds?.map(id => ({
          technologies_tag: { connect: { id }}
        }))
      }
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

  async findMany({skip, take, search}: FindManySharedDto){
    let where: Prisma.forum_questionsWhereInput = {}

    const select: Prisma.forum_questionsSelect = {
      id: true,
      title:true,
      content: true,
      user: {
        select: {
          name:true,
        }
      },
      question_technologies_tags: {
        select: {
          technologies_tag: true,
        }
      },
      comments: true,
     
    }

    if(search) where = {
      OR: [
        {title: {contains: search}},
        {content: {contains: search}}
      ]
     }

     

    const [total, records]= await Promise.all([
      this.forumQuestionRepository.total(where),
      (await (this.forumQuestionRepository.findMany({ where, skip, take, select}))).map(question => {
        //@ts-ignore
        if(question?.question_technologies_tags?.length > 0){
          //@ts-ignore
          question.question_technologies_tags = question.question_technologies_tags?.map(obj => {
            return { ...obj.technologies_tag}
          })
        }
        return {...question}
      }),
    ])

    return {total, records}
  }

    async getComments(id:string, {skip, take}: FindManySharedDto){
      const where: Prisma.commentsWhereInput = {
        forum_question_id: id,
      }

      const select: Prisma.commentsSelect = {
        id: true,
        content:true,
        created_at: true,
        user: {
          select: {
            name:true,
          }
        }
      }
      
      const [total, records] = await Promise.all([
        this.commentRepository.total(where),
        this.commentRepository.findMany({where, select})
      ])

      return {total, records}
  
    }
  
  

  
}
