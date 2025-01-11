import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';

import { Socket } from 'socket.io';
import { MessageRepository } from 'src/database/repositories/message.repository';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
})
export class ChatRoomGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(private readonly messageRepository: MessageRepository) {}

  handleConnection(client: Socket): void {
    const clientId = client.id;
    console.log('client connect', clientId);
    this.connectedClients.set(clientId, client);

    client.on('disconnect', () => {
      console.log('client disconnect', clientId);

      this.connectedClients.delete(clientId);
    });
  }

  @SubscribeMessage('joimRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { message: string; room_id: string },
    @ConnectedSocket() client: Socket,
  ) {
    const token: any = client.handshake.query.access_token;

    const { userId } = verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    if (userId) {
      const newMessage = await this.messageRepository
        .create({
          user: { connect: { id: userId } },
          chat_room: { connect: { id: data.room_id } },
          content: data.message,
        })
        .catch((error) => console.log(error));

      try {
        this.server.to(data.room_id.toString()).emit('message', newMessage);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
