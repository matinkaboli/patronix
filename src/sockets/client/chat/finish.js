import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('chat/finish')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasValidChat
)
.handler((socket, nsp, io) => async () => {
  socket.data.chat.done = true;
  await socket.data.chat.save();

  io
  .of('/customer')
  .to(socket.data.chat._id.toString())
  .emit('finish');

  socket.emit('chat/finish', 200);
});

export default socket;
