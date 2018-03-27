import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { User } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('init')
.middleware(
  middlewares.customer.checkToken
)
.handler(socket => async () => {
  if (!socket.inited) {
    socket.join(socket.data.site._id.toString());

    let userState = {
      online: 0,
      offline: 0
    };

    for (let operator of socket.data.site.operators) {
      let user = await User.findById(operator, { socket: 1 });
      let key = user.socket ? 'online' : 'offline';
      userState[key] = userState[key] + 1;
    }

    socket.emit('init', 200, userState);

    socket.inited = true;
    socket.data.userState = userState;
  }

  socket.emit('init', 200, socket.data.userState);
});

export default socket;
