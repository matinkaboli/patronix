import { SocketEvent } from 'socket.io-manager';

import { SocketStore } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('disconnect')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  await SocketStore.remove({ socket: socket.id });
});

export default socket;
