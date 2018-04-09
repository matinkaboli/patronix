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
.handler((socket, nsp, io) => async () => {
  let sites = await Site.find({ operators: socket.data.user._id }, { _id: 1 });
  for (let site of sites) {
    socket.join(site._id.toString());
  }

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

    for (let site of sites) {
      io
      .of('/customer')
      .to(site._id.toString())
      .emit('getOnline');
    }
  }

  socket.join(socket.data.user._id.toString());
});

export default socket;
