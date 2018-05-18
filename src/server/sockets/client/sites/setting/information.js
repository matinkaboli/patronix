import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/information')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.checkSite
)
.handler(({ shared, socket }) => async (id, information) => {
  shared.site.information = information;

  try {
    await shared.site.save();
    socket.emit('sites/setting/information', 200);
  } catch (e) {
    socket.emit('sites/setting/information', 400);
  }
});

export default socket;
