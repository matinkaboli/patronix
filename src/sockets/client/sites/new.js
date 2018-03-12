import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { Site } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/new')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async name => {
  if (socket.data.user.site) {
    socket.emit('sites/new', 400, 0);
    return;
  }

  let site = new Site({
    name,
    owner: socket.data.user._id,
    token: uid(),
    operators: [socket.data.user._id]
  });

  try {
    await site.save();
    socket.data.user.site = site._id;
    await socket.data.user.save();

    socket.emit('sites/new', 200);
  } catch (e) {
    socket.emit('sites/new', 400, 1);
  }
});

export default socket;
