import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateForumQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    
    @IsOptional()
    @IsArray()
    tagIds: string[]

    
    userId: string;
}
