import { SocketEvent } from 'socket.io-manager';
import { randomBytes } from 'crypto';

import { Site } from 'Root/models';
import middlewares from 'Root/middlewares';
import config from 'Root/config';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/new')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async name => {
  if (socket.data.user.site) {
    socket.emit('sites/new', 400);
  } else {
    let site = new Site({
      name,
      owner: socket.data.user._id,
      token: randomBytes(config.lengths.siteToken).toString('hex')
    });

    try {
      await site.save();
      socket.data.user.site = site._id;
      await socket.data.user.save();

      socket.emit('sites/new', 200);
    } catch (e) {
      socket.emit('sites/new', 400);
    }
  }
});

export default socket;
