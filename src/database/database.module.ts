import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  exports: [UserRepository],
  providers: [PrismaService, UserRepository],
})
export class DatabaseModule {}
