import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ChatRoomService } from './chat_room.service';
import CreateChatRoom from './dto/create-chat-room.dto';
import { Public } from 'src/utils/decorators/public.decorator';
import FindManyChatRoom from './dto/find-many.dto';
import FindManyChatRoomDto from './dto/find-many.dto';

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

  @Get()
  List(@Query() findMany: FindManyChatRoomDto, @Req() req) {
    return this.chatRoomService.findAll(findMany, req.user?.userId);
  }

  @Get('/user')
  ListSubscriberRooms(@Query() findMany: FindManyChatRoomDto, @Req() req) {
    return this.chatRoomService.findAll(findMany, req.user?.userId);
  }

  @Get(':id/messages')
  getMessages(@Param() { id }: { id: string }) {
    return this.chatRoomService.getMessages(id);
  }
}
