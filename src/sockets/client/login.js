import { SocketEvent } from 'socket.io-manager';

import {
  User,
  ClientToken,
  Invitation,
  Site,
  SocketStore,
  Chat
} from 'Root/models';
import { otkey, dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('login')
.handler((socket, nsp, io) => async (credentials, captcha) => {
  if (!socket.attempt) {
    socket.attempt = 1;
  }

  if (socket.attempt > 1 &&
    (!captcha ||
    typeof captcha !== 'string' ||
    socket.data.captcha !== captcha.toLowerCase())
  ) {
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
    socket.emit('login', 401);
    return;
  }

  socket.attempt = 1;

  let token = await ClientToken.findOne({ user: user._id });
  if (token) {
    await token.remove();
  }

  let sites = await Site.find({ operators: user._id }, { _id: 1 });
  let ownedSite;
  let operatorSites = [];
  for (let site of sites) {
    if (site.owner.toString() === user._id.toString()) {
      ownedSite = site;
    } else {
      operatorSites.push(site);
    }

    socket.join(site._id.toString());
  }

  let ss = await SocketStore.findOne({ user: user._id });
  if (ss) {
    for (let sid of ss.sockets) {
      sid !== socket.id &&
      nsp.sockets[sid] &&
      nsp.sockets[sid].disconnect();
    }

    ss.sockets = [socket.id];
    await ss.save();
  }

  else {
    ss = new SocketStore({
      user: user._id,
      sockets: [socket.id]
    });
    await ss.save();

    for (let site of sites) {
      io
      .of('/customer')
      .to(site._id.toString())
      .emit('getOnline');
    }
  }

  token = new ClientToken({ user: user._id });
  token.token = hmac(token._id.toString(), otkey);
  await token.save();

  socket.data.user = user;
  socket.join(user._id.toString());

  socket.handshake.query.token = token.token;

  let invitations = await Invitation
  .find({ user: user._id })
  .populate({ path: 'from', select: 'name' })
  .exec();

  let sites = await Site
  .find({ operators: socket.data.user._id }, { _id: 1 });
  sites = sites.map(i => i._id);

  socket.emit('login', 200, {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar.url
    },
    token: token.token,
    invitations: invitations.map(i => ({
      from: i.from.name,
      code: i.code
    })),
    sites: {
      site: ownedSite,
      sites: operatorSites
    },
    chats: await Chat.find({
      site: { $in: sites },
      taken: false,
      done: false
    }, { chats: 1 })
  });
});

export default socket;
