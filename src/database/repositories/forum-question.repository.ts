import { Injectable } from '@nestjs/common';
import { forum_questions, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ForumQuestionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.forum_questionsCreateInput,
  ): Promise<forum_questions> {
    return this.prisma.forum_questions.create({
      data,
    });
  }

  async findMany({
    where,
    skip,
    take,
    select,
  }: {
    where?: Prisma.forum_questionsWhereInput;
    skip: number;
    take: number;
    select?: Prisma.forum_questionsSelect;
  }): Promise<forum_questions[]> {
    return this.prisma.forum_questions.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async findOne(
    where: Prisma.forum_questionsWhereInput,
    select?: Prisma.forum_questionsSelect,
  ): Promise<forum_questions> {
    return this.prisma.forum_questions.findFirst({
      where,
      select,
    });
  }

  async total(where?: Prisma.forum_questionsWhereInput): Promise<number> {
    return this.prisma.forum_questions.count({
      where,
    });
  }
}
