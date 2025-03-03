import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatRoomRepository } from 'src/database/repositories/chat-room.repository';
import { UserChatRoomRepository } from 'src/database/repositories/subscribe-chat-room.repository';
import errorMessages from 'src/utils/errorMessages';
import CreateChatRoom from './dto/create-chat-room.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import userPvsCommon from 'src/utils/common/user-pvs.common';
import FindManyChatRoomDto from './dto/find-many.dto';
import { Prisma } from '@prisma/client';
import { MessageRepository } from 'src/database/repositories/message.repository';
import { FindManySharedDto } from 'src/utils/dto/find-many.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly userChatRoomRepository: UserChatRoomRepository,
    private readonly userRepository: UserRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async subscribe(chat_room_id: string, userId: string) {
    const room = await this.chatRoomRepository.findOne({ id: chat_room_id });

    if (!room) {
      throw new NotFoundException(errorMessages.roomNotFound);
    }

    return this.userChatRoomRepository.create({
      chat_room: { connect: { id: chat_room_id } },
      user: { connect: { id: userId } },
    });
  }

  async unSubscribe(chat_room_id: string, userId: string) {
    const room = await this.chatRoomRepository.findOne({ id: chat_room_id });

    if (!room) {
      throw new NotFoundException(errorMessages.roomNotFound);
    }

    await this.userChatRoomRepository.delete({
      chat_room_id_user_id: {
        chat_room_id: chat_room_id,
        user_id: userId,
      },
    });

    return { message: 'Sucesso na operação' };
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

  async findAll({ search, skip, take }: FindManyChatRoomDto, userId: string) {
    const user = await this.userRepository.findOne({ id: userId });

    let where: Prisma.chat_roomsWhereInput = {};
    let select: Prisma.chat_roomsSelect = {
      id: true,
      title: true,
      users_chat_rooms: true,
      created_at: true,
    };

    if (search) {
      where = { ...where, title: { contains: search } };
    }

    if (user?.privilege != userPvsCommon.admin) {
      where = {
        ...where,
        users_chat_rooms: {
          every: {
            user_id: {
              not: userId,
            },
          },
        },
      };
    }

    const [total, records] = await Promise.all([
      this.chatRoomRepository.total(where),
      (
        await this.chatRoomRepository.findMany({ where, skip, take, select })
      ).map((room) => {
        return {
          ...room,
          //@ts-ignore
          totalSubscribers: room.users_chat_rooms?.length,
        };
      }),
    ]);

    return { total, records };
  }

  async listSubscriberRooms(
    { search, skip, take }: FindManyChatRoomDto,
    userId: string,
  ) {
    let select: Prisma.chat_roomsSelect = {
      id: true,
      title: true,
      users_chat_rooms: true,
      created_at: true,
    };

    let where: Prisma.chat_roomsWhereInput = {
      users_chat_rooms: {
        some: {
          user_id: userId,
        },
      },
    };

    if (search) {
      where = { ...where, title: { contains: search } };
    }

    const [total, records] = await Promise.all([
      this.chatRoomRepository.total(where),
      (
        await this.chatRoomRepository.findMany({ where, skip, take, select })
      ).map((room) => {
        return {
          ...room,
          //@ts-ignore
          totalSubscribers: room.users_chat_rooms?.length,
        };
      }),
      ,
    ]);

    return { total, records };
  }

  async getMessages(roomId: string, userId: string) {
    const select: Prisma.messagesSelect = {
      id: true,
      chat_room_id: true,
      content: true,
      sent_by_user_id: true,
      user: {
        select: {
          name: true,
        },
      },
      created_at: true,
    };
    const room = await this.chatRoomRepository.findOne({
      id: roomId,
      users_chat_rooms: {
        some: {
          user_id: userId,
          chat_room_id: roomId,
        },
      },
    });

    if (!room) throw new NotFoundException(errorMessages.roomNotFound);

    return await this.messageRepository.findMany({
      where: {
        chat_room_id: roomId,
      },
      select,
    });
  }

  async findOne(chat_room_id: string) {
    const room = await this.chatRoomRepository.findOne({ id: chat_room_id });

    if (!room) {
      throw new NotFoundException(errorMessages.roomNotFound);
    }

    return room;
  }
}
