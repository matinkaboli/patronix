import { SocketEvent } from 'socket.io-manager';

import { User, ClientToken } from 'Root/models';
import { otkey, dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('login')
.handler((socket, nsp) => async (credentials, captcha) => {
  if (!socket.attempt) {
    socket.attempt = 1;
  }

  if (socket.attempt > 1 && !socket.data.captcha === captcha.toLowerCase()) {
    socket.emit('login', 400);
    return;
  }

  let user = await User.findOne({
    ...credentials,
    password: hmac(credentials.password, dbkey),
    status: 1
  });

  if (user) {
    let token = await ClientToken.findOne({ user: user._id });
    if (token) {
      nsp.to(token.token).emit('kick');
      await token.remove();
    }

    token = new ClientToken({ user: user._id });
    token.token = hmac(token._id.toString(), otkey);
    await token.save();

    socket.data.user = user;

    socket.join(token.token);

    socket.handshake.query.token = token.token;

    socket.emit('login', 200, {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar.url
      },
      token: token.token
    });
  }

  else {
    socket.attempt = socket.attempt + 1;
    socket.emit('login', 401);
  }
});

export default socket;
