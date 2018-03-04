import { SocketEvent } from 'socket.io-manager';

import { SocketStore } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('client')
.name('connect')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  let store = SocketStore.findOne({ user: socket.data.user._id });
  if (store) {
    await store.remove();
  }

  store = new SocketStore({
    socket: socket.id,
    user: socket.data.user._id
  });

  await store.save();
});

export default socket;
