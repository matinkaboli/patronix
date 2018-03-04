import { SocketEvent } from 'socket.io-manager';

import { Site } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/remove')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  await Site.remove({ owner: socket.data.user._id });

  socket.data.user.site = null;
  await socket.data.user.save();

  socket.emit('sites/remove', 200);
});

export default socket;
