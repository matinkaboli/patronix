import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.checkSite
)
.handler(socket => async id => {
  await Chat.remove({ site: socket.data.site._id });

  await socket.data.site.remove();

  let index = socket.data.user.sites.findIndex(i =>
    i.toString() === id
  );
  socket.data.user.sites.splice(index, 1);
  await socket.data.user.save();

  socket.emit('sites/remove', 200);
});

export default socket;
