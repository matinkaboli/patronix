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
.handler(({ socket, io }) => async () => {
  socket.data.chat.done = true;
  await socket.data.chat.save();

  io
  .of('/customer')
  .to(socket.data.chat._id.toString())
  .emit('operatorFinished');

  let customer = io
  .of('/customer')
  .sockets[socket.data.chat.customer];

  customer.data.chat = null;
  customer.leave(socket.data.chat._id.toString());

  socket.emit('chat/finish', 200);
});

export default socket;
