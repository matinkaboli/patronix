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
.handler(socket => async message => {
  socket.data.chat.chats.push({
    sender: 0,
    message
  });

  await socket.data.chat.save();
});

export default socket;
