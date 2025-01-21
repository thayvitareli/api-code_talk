import { Injectable } from '@nestjs/common';
import { CreateTechnologiesTagDto } from './dto/create-technologies-tag.dto';
import { UpdateTechnologiesTagDto } from './dto/update-technologies-tag.dto';
import { Prisma } from '@prisma/client';
import { TechnologyTagRepository } from 'src/database/repositories/technology-tag.repository';

@Injectable()
export class TechnologiesTagService {

  constructor(private readonly technologyTagRepository:TechnologyTagRepository){}
 
  async findAll() {
   

    const [total, records] = await Promise.all([
      this.technologyTagRepository.total({}),
      this.technologyTagRepository.findMany({})
    ])
    return {total, records};
  }

}
