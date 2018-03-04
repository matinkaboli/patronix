import { SocketEvent } from 'socket.io-manager';

import { User, ClientToken } from 'Root/models';
import { otkey, dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';
import saveSS from 'Root/helpers/saveSS';

let socket = new SocketEvent();

socket
.namespace('client')
.name('login')
.handler(socket => async credentials => {
  let user = await User.findOne({
    ...credentials,
    password: hmac(credentials.password, dbkey),
    status: 1
  });

  if (user) {
    let token = await ClientToken.findOne({ user: user._id });

    if (token) {
      await token.remove();
    }

    token = new ClientToken({ user: user._id });
    token.token = hmac(token._id.toString(), otkey);

    await token.save();

    socket.data.user = user;

    await saveSS(socket.id, user._id);

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
    socket.emit('login', 401);
  }
});

export default socket;
