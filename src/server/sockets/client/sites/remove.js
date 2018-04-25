import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Site, Chat } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/remove')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async id => {
  try {
    let site = await Site.findById(id);
    if (!site) {
      socket.emit('sites/remove', 404);
    }

    await Chat.remove({ site: site._id });

    await site.remove();

    let index = socket.data.user.sites.findIndex(i =>
      i.toString() === id
    );
    socket.data.user.sites.splice(index, 1);
    await socket.data.user.save();

    socket.emit('sites/remove', 200);
  }
  catch (e) {
    socket.emit('sites/remove', 400);
  }
});

export default socket;
