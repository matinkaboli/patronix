import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Site } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('disconnect')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, io }) => async () => {
  shared.user.socket = null;
  await shared.user.save();

  let sites = await Site.find(
    { operators: shared.user._id },
    { _id: 1 }
  );
  for (let site of sites) {
    io
    .of('/customer')
    .to(site._id.toString())
    .emit('goesOffline');
  }

  if (shared.chat) {
    shared.chat.done = true;
    await shared.chat.save();

    io
    .of('/customer')
    .to(shared.chat._id.toString())
    .emit('operatorLeft');

    let customer = io
    .of('/customer')
    .sockets[shared.chat.customer];

    customer.data.chat = null;

    customer.leave(shared.chat._id.toString());
  }
});

export default socket;
