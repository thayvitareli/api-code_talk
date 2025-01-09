import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { subscribe } from 'diagnostics_channel';

export default class CreateChatRoom {
  @IsString()
  @IsNotEmpty()
  title: string;
}
