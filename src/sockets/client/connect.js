import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import saveSS from 'Root/helpers/saveSS';

let socket = new SocketEvent();

socket
.namespace('client')
.name('connection')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  await saveSS(socket.id, socket.data.user._id);
});

export default socket;
