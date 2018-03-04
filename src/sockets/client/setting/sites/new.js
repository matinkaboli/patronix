import { SocketEvent } from 'socket.io-manager';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/new')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async name => {
  if (socket.data.user.site) {
    socket.emit('sites/new', 400);
  } else {
    socket.data.user.site = {
      name,
      owner: socket.data.user._id
    };

    try {
      await socket.data.user.save();
    } catch (e) {
      socket.emit('sites/new', 400);
    }
  }
});

export default socket;
