import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateForumQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    userId: string;
}
