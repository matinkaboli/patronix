import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('chat/take')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async id => {
  try {
    let chat = await Chat
    .findById(id)
    .populate('site')
    .exec();

    if (chat) {
      let operators = chat.site.operators.map(i => i.toString());
      if (operators.includes(socket.data.user._id.toString())) {
        if (chat.taken) {
          socket.emit('chat/take', 400);
        }

        else {
          chat.taken = true;
          await chat.save();

          socket.data.chat = chat;

          socket.emit('chat/take', 200);
        }
      }

      else {
        socket.emit('chat/take', 403);
      }
    }
  } catch (e) {
    socket.emit('chat/take', 400);
  }
});

export default socket;
