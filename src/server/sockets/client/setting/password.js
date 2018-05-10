import { SocketEvent } from 'socket.io-manager';

import { dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/password')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket }) => async (old, fresh) => {
  if (hmac(old, dbkey) !== shared.user.password) {
    socket.emit('setting/password', 400);
    return;
  }

  shared.user.password = hmac(fresh, dbkey);
  await shared.user.save();

  socket.emit('setting/password', 200);
});

export default socket;
