import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('operator')
.name('setting/avatar/remove')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => () => {

});

export default socket;
