// logout ham mese disconect bayad chat haro done kone!
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
.handler(({ shared, socket, io }) => async () => {
  await ClientToken.remove({ token: socket.handshake.query.token });

  socket.handshake.query.token = '';

  shared.user.socket = null;
  await shared.user.save();

  let sites = await Site.find(
    { operators: shared.user._id },
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
