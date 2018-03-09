import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('message')
.middleware(
  middlewares.customer.checkToken,
  middlewares.customer.hasChat
)
.handler((socket, nsp, io) => async message => {
  try {
    socket.data.chat.chats.push({
      sender: 0,
      message
    });
    await socket.data.chat.save();

    io
    .of('/client')
    .to(socket.data.chat._id.toString())
    .emit('chat/message', message);
  } catch (e) {
    socket.emit('message', 400);
  }
});

export default socket;
