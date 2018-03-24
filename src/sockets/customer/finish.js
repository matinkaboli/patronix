import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('finish')
.middleware(
  middlewares.customer.inited,
  middlewares.customer.checkToken,
  middlewares.customer.hasChat
)
.handler((socket, nsp, io) => async () => {
  socket.data.chat.done = true;
  await socket.data.chat.save();

  io
  .of('/client')
  .to(socket.data.chat._id.toString())
  .emit('chat/finish');

  socket.data.chat = null;

  socket.emit('finish', 200);
});

export default socket;
