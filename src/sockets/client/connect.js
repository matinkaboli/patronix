import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('client')
.name('connection')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  let store = new SocketStore({
    socket: socket.id,
    token: socket.token._id
  });
  await store.save();
});

export default socket;
