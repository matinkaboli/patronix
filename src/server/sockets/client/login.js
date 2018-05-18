import { SocketEvent } from 'socket.io-manager';

import {
  User,
  ClientToken,
  Site,
} from 'Root/models';
import { otkey, dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('login')
.handler(({ socket, nsp, io }) => async (credentials, captcha) => {
  if (!socket.attempt) {
    socket.attempt = 1;
  }

  if (socket.attempt > 1 &&
    (!captcha ||
    typeof captcha !== 'string' ||
    socket.data.captcha !== captcha.toLowerCase())
  ) {
    socket.data.chaptcha = null;
    socket.emit('login', 400);
    return;
  }

  let user = await User.findOne({
    ...credentials,
    password: hmac(credentials.password, dbkey),
    status: 1
  });

  if (!user) {
    socket.attempt = socket.attempt + 1;
    socket.data.chaptcha = null;
    socket.emit('login', 401);
    return;
  }

  socket.attempt = 1;

  let token = await ClientToken.findOne({ user: user._id });
  if (token) {
    await token.remove();
  }

  let sites = await Site.find({ operators: user._id }, { _id: 1 });
  for (let site of sites) {
    socket.join(site._id.toString());
  }

  if (user.socket) {
    nsp.sockets[user.socket] &&
    nsp.sockets[user.socket].disconnect();
  }

  user.socket = socket.id;
  await user.save();

  for (let site of sites) {
    io
    .of('/customer')
    .to(site._id.toString())
    .emit('getOnline');
  }

  token = new ClientToken({ user: user._id });
  token.token = hmac(token._id.toString(), otkey);
  await token.save();

  socket.join(user._id.toString());

  socket.handshake.query.token = token.token;

  socket.emit('login', 200, token.token);
});

export default socket;
