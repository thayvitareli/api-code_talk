import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateChatRoom {
  @IsString()
  @IsNotEmpty()
  title: string;
}
