import { Module } from '@nestjs/common';
import { TechnologiesTagService } from './technologies-tag.service';
import { TechnologiesTagController } from './technologies-tag.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TechnologiesTagController],
  providers: [TechnologiesTagService],
})
export class TechnologiesTagModule {}
