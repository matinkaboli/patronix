import { SocketEvent } from 'socket.io-manager';

import { User, SocketStore } from 'Root/models';
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

  let ss = await SocketStore.findOne({ user: user._id }, { _id: 1 });
  let state = 'offline';
  if (ss) {
    state = 'online';

    for (let soket of ss) {
      nsp.sockets[soket].leave(socket.data.site._id.toString());
    }
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
