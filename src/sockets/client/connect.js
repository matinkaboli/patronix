import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore, Site } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('connection')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  let ss = await SocketStore.findOne({ user: socket.data.user._id });

  if (ss) {
    ss.sockets.push(socket.id);
    await ss.save();
  }

  else {
    ss = new SocketStore({
      user: socket.data.user._id,
      sockets: [socket.id]
    });
    await ss.save();
  }

  let sites = await Site.find({ operators: socket.data.user._id }, { _id: 1 });
  for (let site of sites) {
    socket.join(site._id.toString());
  }

  socket.join(socket.data.token.token);
});

export default socket;
