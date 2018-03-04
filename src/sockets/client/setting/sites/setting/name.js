import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('client')
.name('sites/setting/name')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler(socket => async name => {
  socket.data.site.name = name;

  try {
    await socket.data.site.save();
    socket.emit('sites/setting/name');
  } catch (e) {
    socket.emit('sites/setting/name', 400);
  }
});

export default socket;
