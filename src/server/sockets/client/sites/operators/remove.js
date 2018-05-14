import { SocketEvent } from 'socket.io-manager';

import { User } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/operators/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.checkSite
)
.handler(({ shared, socket, nsp, io }) => async (id, email) => {
  let user = await User.findOne({ email });

  if (!user) {
    socket.emit('sites/operators/remove', 400, 0);
    return;
  }

  if (shared.user._id.toString() !== shared.site.owner.toString()) {
    socket.emit('sites/operators/remove', 400, 2);
    return;
  }

  if (user._id.toString() === shared.site.owner.toString()) {
    socket.emit('sites/operators/remove', 400, 1);
    return;
  }

  let index = shared.site.operators.map(i => i.toString())
  .findIndex(i => i === user._id.toString());
  shared.site.operators.splice(index, index + 1);

  await shared.site.save();

  let state = 'offline';
  if (user.socket) {
    state = 'online';
    nsp.sockets[user.socket].leave(shared.site._id.toString());
  }

  io
  .of('/customer')
  .to(shared.site._id.toString())
  .emit('decrease', state);

  nsp
  .to(user._id.toString())
  .emit('sites/kick', {
    name: shared.site.name,
    _id: shared.site._id
  });

  socket.emit('sites/operators/remove', 200);
});

export default socket;
