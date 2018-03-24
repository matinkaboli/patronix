import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('sendMessage')
.middleware(
  middlewares.customer.inited,
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
    .emit('chat/new', message);

    socket.data.chat = chat;
  }

  socket.data.chat = await Chat.findById(socket.data.chat._id);

  if (socket.data.chat.done) {
    socket.emit('sendMessage', 400, 0);
    return;
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
    .emit('chat/recieve', message);
  } catch (e) {
    socket.emit('sendMessage', 400, 1);
  }
});

export default socket;
