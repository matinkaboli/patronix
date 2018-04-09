import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { ClientToken, Site } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('logout')
.middleware(
  middlewares.client.checkToken
)
.handler((socket, nsp, io) => async () => {
  await ClientToken.remove({ token: socket.handshake.query.token });

  socket.handshake.query.token = '';

  socket.data.user.socket = null;
  await socket.data.user.save();

  let sites = await Site.find(
    { operators: socket.data.user._id },
    { _id: 1 }
  );
  for (let site of sites) {
    io
    .of('/customer')
    .to(site._id.toString())
    .emit('goesOffline');
  }

  socket.emit('logout', 200);
});

export default socket;
