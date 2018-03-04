import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler(socket => async () => {
  await socket.data.site.remove();

  socket.data.user.site = null;
  await socket.data.user.save();

  socket.emit('sites/remove', 200);
});

export default socket;
