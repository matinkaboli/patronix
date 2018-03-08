import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('connection')
.middleware(
  middlewares.customer.checkToken
)
.handler(() => () => {});

export default socket;
