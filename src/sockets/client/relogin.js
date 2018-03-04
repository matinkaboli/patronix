import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('client')
.name('relogin')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => () => {
  socket.emit('relogin', 200,
  {
    user: {
      name: socket.data.user.name,
      email: socket.data.user.email,
      avatar: socket.data.user.avatar.url
    }
  });
});

export default socket;
