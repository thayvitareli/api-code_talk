import { Injectable } from '@nestjs/common';
import { comments, messages, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.commentsCreateInput): Promise<comments> {
    return this.prisma.comments.create({
      data,
    });
  }

  async findMany({where, select}:{where?: Prisma.commentsWhereInput, select?: Prisma.commentsSelect}): Promise<comments[]> {
    return this.prisma.comments.findMany({
      where,
      select
    });
  }

  
  async total(where: Prisma.commentsWhereInput): Promise<number> {
    return this.prisma.comments.count({
      where,
    });
  }
}
