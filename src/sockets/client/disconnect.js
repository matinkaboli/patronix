import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { SocketStore, Site } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('disconnect')
.middleware(
  middlewares.client.checkToken
)
.handler((socket, nsp, io) => async () => {
  let ss = await SocketStore.findOne({ user: socket.data.user._id });

  if (ss) {
    let index = ss.sockets.findIndex(i => i === socket.id);
    ss.sockets.splice(index, index + 1);

    if (!ss.sockets.length) {
      await ss.remove();

      let sites = await Site.find(
        { operators: socket.data.user._id },
        { _id: 1 }
      );
      for (let site of sites) {
        io
        .of('/customer')
        .to(site._id.toString())
        .emit('goesOffline');
      }
    }

    else {
      await ss.save();
    }
  }

  if (socket.data.chat) {
    socket.data.chat.done = true;
    await socket.data.chat.save();

    io
    .of('/customer')
    .to(socket.data.chat._id.toString())
    .emit('operatorLeft');

    let customer = io
    .of('/customer')
    .sockets[socket.data.chat.customer];

    customer.data.chat = null;

    customer.leave(socket.data.chat._id.toString());
  }
});

export default socket;
