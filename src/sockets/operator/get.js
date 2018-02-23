import { SocketEvent } from 'socket.io-manager';

import middles from 'Root/middles';
import { routerHandler } from 'Root/routerHandler';

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('get')
.middleware(
  middles.operator.get
)
.handler(socket => data => {
  routerHandler(socket, data).then(res => {
    socket.emit('get', res.status, res.data);
  });
});

export default socket;
