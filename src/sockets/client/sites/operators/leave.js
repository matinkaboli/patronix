import { SocketEvent } from 'socket.io-manager';

import { Site } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/operators/leave')
.middleware(
  middlewares.client.checkToken
)
.handler((socket, nsp, io) => async id => {
  try {
    let site = await Site.findById(id);

    if (!site) {
      socket.emit('sites/operators/leave', 400, 0);
      return;
    }

    let userId = socket.data.user._id.toString();
    let operators = site.operators.map(i => i.toString());
    if (!operators.includes(userId)) {
      socket.emit('sites/operators/leave', 400, 1);
      return;
    }

    if (site.owner.toString() === userId) {
      socket.emit('sites/operators/leave', 400, 3);
      return;
    }

    let index = operators.findIndex(i => i === userId);
    site.operators.splice(index, index + 1);
    await site.save();

    io
    .of('/customer')
    .to(site._id.toString())
    .emit('decrease');

    socket.emit('sites/operators/leave', 200);
  } catch (e) {
    socket.emit('sites/operators/leave', 400, 2);
  }
});

export default socket;
