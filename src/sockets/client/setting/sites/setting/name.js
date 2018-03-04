import { SocketEvent } from 'socket.io-manager';

import { Site } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/name')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async name => {
  let site = await Site.findOne({ owner: socket.data.user._id });

  if (site) {
    site.name = name;
    try {
      await site.save();
      socket.emit('sites/setting/name');
    } catch (e) {
      socket.emit('sites/setting/name', 400);
    }
  } else {
    socket.emit('sites/setting/name', 400);
  }
});

export default socket;
