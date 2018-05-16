import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/bio')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket }) => async bio => {
  shared.user.bio = bio;
  try {
    await shared.user.save();

    socket.emit('setting/name', 200);
  } catch (e) {
    socket.emit('setting/name', 400);
  }

});

export default socket;
