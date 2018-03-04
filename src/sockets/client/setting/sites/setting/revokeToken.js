import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { Site } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/revokeToken')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  let site = await Site.findOne({ owner: socket.data.user._id });

  if (site) {
    site.token = uid();

    try {
      await site.save();
      socket.emit('sites/setting/revokeToken');
    } catch (e) {
      socket.emit('sites/setting/revokeToken', 400);
    }
  } else {
    socket.emit('sites/setting/revokeToken', 400);
  }
});

export default socket;
