import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('client')
.name('setting/name')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => name => {
  console.log(name);
});

export default socket;
