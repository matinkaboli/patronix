import { SocketEvent } from 'socket.io-manager';

import { User } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/operators/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler((socket, nsp, io) => async email => {
  let user = await User.findOne({ email });

  if (!user) {
    socket.emit('sites/operators/remove', 400, 0);
    return;
  }

  if (user._id.toString() === socket.data.site.owner.toString()) {
    socket.emit('sites/operators/remove', 400, 1);
    return;
  }

  let index = socket.data.site.operators.map(i => i.toString())
  .findIndex(i => i === user._id.toString());
  socket.data.site.operators.splice(index, index + 1);

  await socket.data.site.save();

  let state = 'offline';
  if (user.socket) {
    state = 'online';
    nsp.sockets[user.socket].leave(socket.data.site._id.toString());
  }

  io
  .of('/customer')
  .to(socket.data.site._id.toString())
  .emit('decrease', state);

  nsp
  .to(user._id.toString())
  .emit('sites/kick', {
    name: socket.data.site.name,
    _id: socket.data.site._id
  });

  socket.emit('sites/operators/remove', 200);
});

export default socket;