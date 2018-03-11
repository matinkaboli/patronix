import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('disconnect')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  let ss = await SocketStore.findOne({ user: socket.data.user._id });

  if (ss) {
    let index = ss.sockets.findIndex(i => i === socket.id);
    ss.sockets.splice(index, index + 1);

    if (!ss.sockets.length) {
      await ss.remove();
      return;
    }
    
    await ss.save();
  }
});

export default socket;
