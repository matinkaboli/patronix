import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('message')
.middleware(
  middlewares.customer.checkToken,
  middlewares.customer.hasSite
)
.handler(socket => )
