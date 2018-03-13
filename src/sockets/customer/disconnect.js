import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('disconnect')
.middleware(
  middlewares.customer.checkToken,
  middlewares.customer.hasChat
)
.handler(socket => async () => {
  if (!socket.data.chat) {
    return;
  }

  if (!socket.data.chat.taken) {
    await socket.data.chat.remove();
    return;
  }

  socket.data.chat.done = true;
  await socket.data.chat.save();
});

export default socket;
