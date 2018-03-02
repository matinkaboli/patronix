import { SocketEvent } from 'socket.io-manager';

import { dbkey } from 'Root/config';
import { hmac } from 'Root/crypt';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/password')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async (old, fresh) => {

});

export default socket;
