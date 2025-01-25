import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechnologiesTagService } from './technologies-tag.service';
import { CreateTechnologiesTagDto } from './dto/create-technologies-tag.dto';
import { UpdateTechnologiesTagDto } from './dto/update-technologies-tag.dto';

@Controller('technologies-tag')
export class TechnologiesTagController {
  constructor(
    private readonly technologiesTagService: TechnologiesTagService,
  ) {}

  @Get()
  findAll() {
    return this.technologiesTagService.findAll();
  }
}
