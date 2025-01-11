import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat_room.service';
import { ChatRoomController } from './chat_room.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ChatRoomGateway } from './chat_room.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, ChatRoomGateway],
})
export class ChatRoomModule {}
