import { SocketEvent } from 'socket.io-manager';
import { randomBytes } from 'crypto';

import { dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';
import middlewares from 'Root/middlewares';
import { AL, ClientToken } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/email')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async (email, password) => {
  if (hmac(password, dbkey) === socket.data.user.password) {
    try {
      socket.data.user.email = email;
      socket.data.user.status = 0;

      await socket.data.user.save();

      let al = new AL({
        code: randomBytes(25).toString('hex'),
        user: socket.data.user._id
      });

      await al.save();

      await ClientToken.remove({ user: socket.data.user._id });

      socket.emit('setting/email', 200);
    } catch (e) {
      socket.emit('setting/email', 400);
    }

  } else {
    socket.emit('setting/email', 400);
  }
});

export default socket;
