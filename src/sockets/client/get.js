import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { routerHandler } from 'Root/routerHandler';

let socket = new SocketEvent();

socket
.namespace('client')
.name('get')
.middleware(
  middlewares.client.get
)
.handler(socket => data => {
  routerHandler(socket, data).then(res => {
    socket.emit('get', res.status, res.data);
  });
});

export default socket;
