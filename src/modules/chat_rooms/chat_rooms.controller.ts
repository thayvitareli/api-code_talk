import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ChatRoomService } from './chat_rooms.service';
import CreateChatRoom from './dto/create-chat-room.dto';

import FindManyChatRoomDto from './dto/find-many.dto';
import { FindManySharedDto } from 'src/utils/dto/find-many.dto';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}


  @Get('user')
  ListSubscriberRooms(@Query() findMany: FindManyChatRoomDto, @Req() req) {
    return this.chatRoomService.listSubscriberRooms(findMany, req.user?.userId);
  }

  @Post()
  create(@Body() body: CreateChatRoom, @Req() req) {
    return this.chatRoomService.create(body, req.user.userId);
  }

  @Get()
  List(@Query() findMany: FindManyChatRoomDto, @Req() req) {
    console.log(findMany)
    return this.chatRoomService.findAll(findMany, req.user?.userId);
  }

  @Get(':id')
  findOne(@Param() { id }: { id: string }) {
    return this.chatRoomService.findOne(id);
  }

  @Get(':id/messages')
  getMessages(@Param() { id }: { id: string }, @Req() req) {
    return this.chatRoomService.getMessages(id, req.user?.userId);
  }

   
  @Post(':id/subscribe')
  subscribe(@Param() { id }: { id: string }, @Req() req) {
    return this.chatRoomService.subscribe(id, req.user.userId);
  }

  @Post(':id/unsubscribe')
  unsubscribe(@Param() { id }: { id: string }, @Req() req) {
    return this.chatRoomService.unSubscribe(id, req.user.userId);
  }

 
  
}
