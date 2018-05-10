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
.handler(({ shared, socket }) => async name => {
  if (shared.user.sites.length > 2) {
    socket.emit('sites/new', 400, 0);
    return;
  }

  let site = new Site({
    name,
    owner: shared.user._id,
    token: uid(),
    operators: [shared.user._id]
  });

  try {
    await site.save();
    shared.user.sites = shared.user.sites.concat(site._id);
    await shared.user.save();

    socket.emit('sites/new', 200, site._id.toString());
  } catch (e) {
    socket.emit('sites/new', 400, 1);
  }
});

export default socket;
