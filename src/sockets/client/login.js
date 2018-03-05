import { SocketEvent } from 'socket.io-manager';

import { User, ClientToken, SocketStore } from 'Root/models';
import { otkey, dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('login')
.handler((socket, nsp) => async credentials => {
  let user = await User.findOne({
    ...credentials,
    password: hmac(credentials.password, dbkey),
    status: 1
  });

  if (user) {
    let token = await ClientToken.findOne({ user: user._id });
    if (token) {
      let sstores = await SocketStore.find({ token: token._id });
      for (let sstore of sstores) {
        let target = nsp.sockets[sstore.socket];
        if (target) {
          target.emit('kick');
          target.disconnect();
        }
      }

      await SocketStore.find({ token: token._id });
      await token.remove();
    }

    token = new ClientToken({ user: user._id });
    token.token = hmac(token._id.toString(), otkey);
    await token.save();

    socket.data.user = user;

    let store = new SocketStore({
      socket: socket.id,
      token: token._id
    });
    await store.save();

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
    socket.emit('login', 401);
  }
});

export default socket;
