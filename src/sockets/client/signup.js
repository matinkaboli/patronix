import { SocketEvent } from 'socket.io-manager';
import { randomBytes } from 'crypto';

import { User, AL } from 'Root/models';
import { dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';

let socket = new SocketEvent();

socket
.namespace('client')
.name('signup')
.handler(socket => async (data, captcha) => {
  if (captcha !== socket.data.captcha) {
    socket.emit('signup', 400);
  } else {
    let user = new User({
      name: data.name,
      email: data.email,
      password: hmac(data.password, dbkey),
      status: 0
    });

    try {
      await user.save();

      let al = new AL({
        code: randomBytes(25).toString('hex'),
        user: user._id
      });

      await al.save();
      socket.emit('signup', 200);
    } catch (e) {
      socket.emit('signup', 400);
    }
  }
});

export default socket;
