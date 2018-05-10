import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/avatar/remove')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket }) => async () => {
  shared.user.avatar = null;
  await shared.user.save();

  socket.emit('setting/avatar/remove', 200);
});

export default socket;
