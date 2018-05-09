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
.handler(({ socket, io }) => async () => {
  if (socket.data.user.socket) {
    socket.emit('kickedByServer');
    socket.disconnect();
    return;
  }

  let sites = await Site.find({ operators: socket.data.user._id }, { _id: 1 });
  for (let site of sites) {
    socket.join(site._id.toString());
  }

  socket.data.user.socket = socket.id;
  await socket.data.user.save();

  for (let site of sites) {
    io
    .of('/customer')
    .to(site._id.toString())
    .emit('getOnline');
  }

  socket.join(socket.data.user._id.toString());
});

export default socket;
