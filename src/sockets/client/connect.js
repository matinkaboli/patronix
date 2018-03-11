import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('connection')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  socket.join(socket.token.token);

  let ss = await SocketStore.findOne({ user: socket.data.user._id });

  if (ss) {
    ss.sockets.push(socket.id);
    await ss.save();
  }

  else {
    ss = new SocketStore({
      user: socket.data.user._id,
      sockets: [socket.id]
    });
    await ss.save();
  }
});

export default socket;
