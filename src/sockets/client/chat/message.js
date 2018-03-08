import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('chat/message')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasChat
)
.handler(socket => async message => {
  console.log('here');
  socket.data.chat.chats.push({
    sender: 1,
    message
  });
  await socket.data.chat.save();
});

export default socket;
