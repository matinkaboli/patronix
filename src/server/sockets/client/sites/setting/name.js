import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/name')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler(({ shared, socket }) => async (id, name) => {
  shared.site.name = name;

  try {
    await shared.site.save();
    socket.emit('sites/setting/name', 200);
  } catch (e) {
    socket.emit('sites/setting/name', 400);
  }
});

export default socket;
