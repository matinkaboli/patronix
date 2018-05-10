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
.handler(({ shared, socket }) => async id => {
  await Chat.remove({ site: shared.site._id });

  await shared.site.remove();

  let index = shared.user.sites.findIndex(i =>
    i.toString() === id
  );
  shared.user.sites.splice(index, 1);
  await shared.user.save();

  socket.emit('sites/remove', 200);
});

export default socket;
