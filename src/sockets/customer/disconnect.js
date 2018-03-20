import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('disconnect')
.middleware(
  middlewares.customer.inited,
  middlewares.customer.checkToken,
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
  .emit('customerLeft');
});

export default socket;
