import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/avatar/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.checkSite
)
.handler(({ shared, socket }) => async () => {
  shared.site.avatar = null;
  await shared.site.save();

  socket.emit('sites/setting/avatar/remove', 200);
});

export default socket;
