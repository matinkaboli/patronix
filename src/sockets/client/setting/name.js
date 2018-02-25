import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('client')
.name('updateName')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => name => {
  console.log(socket, name);
});

export default socket;
