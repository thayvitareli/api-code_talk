import { PartialType } from '@nestjs/mapped-types';
import { CreateForumQuestionDto } from './create-forum_question.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentForumQuestionsDto {

    @IsString()
    @IsNotEmpty()
    content: string;

    userId: string;
}
