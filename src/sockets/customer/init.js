import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore } from 'Root/models';

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

    let state = {
      online: [],
      offline: []
    };

    for (let operator of socket.data.site.operators) {
      let ss = await SocketStore.findOne({ user: operator });
      state[ss ? 'online' : 'offline'].push(ss.user);
    }

    socket.emit('init', 200, state);

    socket.inited = true;
    socket.data.state = state;
  }

  socket.emit('init', 200, socket.data.state);
});

export default socket;
