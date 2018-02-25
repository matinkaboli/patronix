import { SocketEvent } from 'socket.io-manager';

import { User, AL } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('client')
.name('activate')
.handler(socket => async code => {
  let al = await AL.findOne({ code });

  if (al) {
    let user = await User.findById(al.user);

    user.status = 1;

    await user.save();
    await al.remove();

    socket.emit('activate', 200);
  } else {
    socket.emit('activate', 404);
  }
});

export default socket;