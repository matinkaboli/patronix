import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { RL, User } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('recovery')
.handler(socket => async email => {
  let user = await User.findOne({ email });

  if (user) {
    let rl = await RL.findOne({ user: user._id });

    if (rl) {
      // resend email

      socket.emit('recovery', 200);
    }

    else {
      rl = new RL({
        code: uid(),
        user: user._id
      });

      await rl.save();

      socket.emit('recovery', 200);
    }
  }

  else {
    socket.emit('recovery', 400);
  }
});

export default socket;
