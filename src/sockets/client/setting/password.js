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
.handler(socket => async (old, fresh) => {
  if (hmac(old, dbkey) === socket.data.user.password) {
    socket.data.user.password = hmac(fresh, dbkey);
    await socket.data.user.save();

    socket.emit('setting/password', 200);
  } else {
    socket.emit('setting/password', 403);
  }
});

export default socket;
