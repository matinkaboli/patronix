import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/revokeToken')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler(({ socket }) => async () => {
  socket.data.site.token = uid();

  try {
    await socket.data.site.save();
    socket.emit('sites/setting/revokeToken', 200, socket.data.site.token);
  } catch (e) {
    socket.emit('sites/setting/revokeToken', 400);
  }
});

export default socket;
