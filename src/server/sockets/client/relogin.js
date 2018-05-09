import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('relogin')
.middleware(
  middlewares.client.checkToken
)
.handler(({ socket }) => async () => {
  socket.emit('relogin', 200);
});

export default socket;
