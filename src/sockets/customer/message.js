import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('message')
.middleware(
  middlewares.customer.checkToken
)
.handler((socket, nsp, io) => async message => {
  if (!socket.data.chat) {
    let chat = new Chat({
      site: socket.data.site._id
    });
    await chat.save();

    socket.join(chat._id.toString());

    io
    .of('/client')
    .to(socket.data.site._id.toString())
    .emit('newchat', message);

    socket.data.chat = chat;
  }

  try {
    socket.data.chat.chats.push({
      sender: 0,
      message
    });
    await socket.data.chat.save();

    io
    .of('/client')
    .to(socket.data.chat._id.toString())
    .emit('chat/message', message);
  } catch (e) {
    socket.emit('message', 400);
  }
});

export default socket;
