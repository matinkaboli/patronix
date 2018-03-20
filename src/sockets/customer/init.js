import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('init')
.middleware(
  middlewares.customer.checkToken
)
.handler(socket => () => {
  if (!socket.inited) {
    socket.join(socket.data.site._id.toString());

    socket.inited = true;
  }
  
  socket.emit('init', 200);
});

export default socket;
