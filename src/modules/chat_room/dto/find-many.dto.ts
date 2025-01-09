import {  IsOptional, IsString } from 'class-validator';
import { FindManySharedDto } from 'src/utils/dto/find-many.dto';

export default class FindManyChatRoomDto extends FindManySharedDto  {
    @IsOptional()
  @IsString()
  search?: string;
}
