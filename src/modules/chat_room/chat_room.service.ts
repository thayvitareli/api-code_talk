import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatRoomRepository } from 'src/database/repositories/chat-room.repository';
import { SubscribeChatRoomRepository } from 'src/database/repositories/subscribe-chat-room.repository';
import errorMessages from 'src/utils/errorMessages';
import CreateChatRoom from './dto/create-chat-room.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import userPvsCommon from 'src/utils/common/user-pvs.common';

@Injectable()
export class ChatRoomService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly subscribeChatRoomRepository: SubscribeChatRoomRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async subscribe(chat_room_id: string, userId: string) {
    const room = await this.chatRoomRepository.findOne({ id: chat_room_id });

    if (!room) {
      throw new NotFoundException(errorMessages.roomNotFound);
    }

    return this.subscribeChatRoomRepository.create({
      chat_room: { connect: { id: chat_room_id } },
      user: { connect: { id: userId } },
    });
  }

  async unSubscribe(chat_room_id: string, userId: string) {
    const room = await this.chatRoomRepository.findOne({ id: chat_room_id });

    if (!room) {
      throw new NotFoundException(errorMessages.roomNotFound);
    }

    await this.subscribeChatRoomRepository.delete({
      chat_room_id_user_id: {
        chat_room_id: chat_room_id,
        user_id: userId,
      },
    });

    return;
  }

  async create({ title }: CreateChatRoom, userId: string) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user || user.privilege != userPvsCommon.admin) {
      throw new UnauthorizedException();
    }
    return await this.chatRoomRepository.create({
      title,
    });
  }
}
