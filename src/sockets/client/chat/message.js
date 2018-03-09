import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('chat/message')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasValidChat
)
.handler((socket, nsp, io) => async message => {
  try {
    socket.data.chat.chats.push({
      sender: 1,
      message
    });
    await socket.data.chat.save();

    io
    .of('/customer')
    .to(socket.data.chat._id.toString())
    .emit('message', message);
  } catch (e) {
    socket.emit('chat/message', 400);
  }
});

export default socket;
