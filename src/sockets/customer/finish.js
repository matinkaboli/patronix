import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('finish')
.middleware(
  middlewares.customer.inited,
  middlewares.customer.hasChat
)
.handler((socket, nsp, io) => async () => {
  socket.data.chat.done = true;
  await socket.data.chat.save();

  io
  .of('/client')
  .to(socket.data.chat._id.toString())
  .emit('chat/finish');

  let operator = io
  .of('/client')
  .sockets[socket.data.chat.operator.socket];

  operator.data.chat = null;
  operator.leave(socket.data.chat._id.toString());

  socket.data.chat = null;

  socket.emit('finish', 200);
});

export default socket;
