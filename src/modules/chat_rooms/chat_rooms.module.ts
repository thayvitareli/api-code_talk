import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat_rooms.service';
import { ChatRoomController } from './chat_rooms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ChatRoomGateway } from './chat_rooms.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, ChatRoomGateway],
})
export class ChatRoomsModule {}
