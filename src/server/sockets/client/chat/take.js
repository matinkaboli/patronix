import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('chat/take')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.validChat
)
.handler(({ shared, socket, io }) => async () => {
  let operators = shared.chat.site.operators.map(i => i.toString());
  if (!operators.includes(shared.user._id.toString())) {
    socket.emit('chat/take', 403);
    return;
  }

  if (shared.chat.taken) {
    socket.emit('chat/take', 400, 1);
    return;
  }

  shared.chat.taken = true;
  shared.chat.operator = {
    id: shared.user._id,
    socket: socket.id
  };
  await shared.chat.save();

  socket.join(shared.chat._id.toString());

  io
  .of('/customer')
  .to(shared.chat._id.toString())
  .emit('took', {
    name: shared.user.name,
    avatar: shared.user.avatar
  });

  socket.emit('chat/take', 200);
});

export default socket;
