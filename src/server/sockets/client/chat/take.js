import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat } from 'Root/models';
import { url } from 'Root/config';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('chat/take')
.middleware(
  middlewares.client.checkToken
)
.handler((socket, nsp, io) => async id => {
  if (socket.data.chat) {
    socket.emit('chat/take', 400, 2);
    return;
  }
  
  try {
    let chat = await Chat
    .findById(id)
    .populate('site')
    .exec();

    if (!chat) {
      socket.emit('chat/take', 400, 0);
      return;
    }

    let operators = chat.site.operators.map(i => i.toString());
    if (!operators.includes(socket.data.user._id.toString())) {
      socket.emit('chat/take', 403);
      return;
    }

    if (chat.taken) {
      socket.emit('chat/take', 400, 1);
      return;
    }

    chat.taken = true;
    chat.operator = {
      id: socket.data.user._id,
      socket: socket.id
    };
    await chat.save();

    socket.data.chat = chat;
    socket.join(chat._id.toString());

    io
    .of('/customer')
    .to(chat._id.toString())
    .emit('took', {
      name: socket.data.user.name,
      avatar: url + socket.data.user.avatar.url
    });

    socket.emit('chat/take', 200);
  } catch (e) {
    socket.emit('chat/take', 400, 3);
  }
});

export default socket;