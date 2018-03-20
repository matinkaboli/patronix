import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/customer')
.name('getOnlines')
.middleware(
  middlewares.customer.inited,
  middlewares.customer.checkToken
)
.handler(socket => async () => {
  if (socket.data.did) {
    return;
  }

  let status = [0, 0];
  for (let operator of socket.data.site.operators) {
    let ss = await SocketStore.findOne({ user: operator });
    if (ss) {
      status[0] = status[0] + 1;
      continue;
    }

    status[1] = status[1] + 1;
  }

  socket.emit('getOnlines', ...status);
  socket.data.did = true;
});

export default socket;
