import { SocketEvent } from 'socket.io-manager';

import { SocketStore } from 'Root/models';

let socket = new SocketStore();

socket
.namespace('client')
.name('disconnect')
.middleware(
  
)
