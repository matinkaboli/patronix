import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('client')
.name('setting/name')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async name => {
  socket.data.user.name = name.name;
  await socket.data.user.save();

  socket.emit('setting/name', 200);
});

export default socket;
