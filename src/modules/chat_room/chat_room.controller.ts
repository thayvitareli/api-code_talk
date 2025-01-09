import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ChatRoomService } from './chat_room.service';
import CreateChatRoom from './dto/create-chat-room.dto';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post(':id/subscribe')
  subscribe(@Param() { id }: { id: string }, @Req() req) {
    return this.chatRoomService.subscribe(id, req.user.userId);
  }

  @Post()
  create(@Body() body: CreateChatRoom, @Req() req) {
    return this.chatRoomService.create(body, req.user.userId);
  }
}
