import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('disconnect')
.middleware(
  middlewares.customer.hasChat
)
.handler((socket, nsp, io) => async () => {
  if (!socket.data.chat) {
    return;
  }

  if (!socket.data.chat.taken) {
    await socket.data.chat.remove();
    return;
  }

  socket.data.chat.done = true;
  await socket.data.chat.save();

  io
  .of('/client')
  .to(socket.data.chat._id.toString())
  .emit('chat/customerLeft');

  let operator = io
  .of('/client')
  .sockets[socket.data.chat.operator.socket];

  operator.data.chat = null;
  operator.leave(socket.data.chat._id.toString());
});

export default socket;
