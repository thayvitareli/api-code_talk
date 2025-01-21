import { Injectable } from '@nestjs/common';
import { chat_rooms, Prisma, technologies_tag } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TechnologyTagRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    where,
    skip,
    take,
    select,
  }: {
    where?: Prisma.technologies_tagWhereInput;
    skip?: number;
    take?: number;
    select?: Prisma.technologies_tagSelect;
  }): Promise<technologies_tag[]> {
    return this.prisma.technologies_tag.findMany({
      where,
      skip,
      take,
      select,
    });
  }

  async total(where?: Prisma.chat_roomsWhereInput): Promise<number> {
    return this.prisma.chat_rooms.count({
      where,
    });
  }
}
