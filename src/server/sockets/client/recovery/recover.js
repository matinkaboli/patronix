import { SocketEvent } from 'socket.io-manager';

import { RL, User } from 'Root/models';
import { hmac } from 'Root/crypt';
import { dbkey } from 'Root/config';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('recover')
.handler(({ socket }) => async (password, code) => {
  let rl = await RL.findOne({ code });

  if (!rl) {
    socket.emit('recover', 400);
    return;
  }

  let user = await User.findOne({ _id: rl.user });

  user.password = hmac(password, dbkey);

  await user.save();
  await rl.remove();

  socket.emit('recover', 200);
});

export default socket;
