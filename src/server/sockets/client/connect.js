import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Site } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('connection')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket, io }) => async () => {
  if (shared.user.socket) {
    socket.emit('kickedByServer');
    socket.disconnect();
    return;
  }

  let sites = await Site.find({ operators: shared.user._id }, { _id: 1 });
  for (let site of sites) {
    socket.join(site._id.toString());
  }

  shared.user.socket = socket.id;
  await shared.user.save();

  for (let site of sites) {
    io
    .of('/customer')
    .to(site._id.toString())
    .emit('getOnline');
  }

  socket.join(shared.user._id.toString());
});

export default socket;
