import { SocketEvent } from 'socket.io-manager';

import middles from 'Root/middles';
import { OperatorToken } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('logout')
.middleware(
  middles.operator.checkToken
)
.handler(socket => async() => {
  await OperatorToken.remove({ token: socket.handshake.query.token });

  socket.handshake.query.token = '';

  socket.emit('logout', 200);
});

export default socket;
