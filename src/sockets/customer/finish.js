import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('finish')
.middleware(
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
});

export default socket;
