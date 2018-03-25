import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler(socket => async () => {
  await Chat.remove({ site: socket.data.site._id });

  await socket.data.site.remove();
  socket.data.site = null;

  socket.data.user.site = null;
  await socket.data.user.save();

  socket.emit('sites/remove', 200);
});

export default socket;
