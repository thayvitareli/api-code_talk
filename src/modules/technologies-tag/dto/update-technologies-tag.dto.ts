import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnologiesTagDto } from './create-technologies-tag.dto';

export class UpdateTechnologiesTagDto extends PartialType(
  CreateTechnologiesTagDto,
) {}
