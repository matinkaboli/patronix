import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('updateName')
.middleware(
  middlewares.operator.checkToken
)
.handler(socket => name => {
  console.log(socket, name);
});

export default socket;
