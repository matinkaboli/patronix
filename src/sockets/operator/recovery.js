import { SocketEvent } from 'socket.io-manager';
import { randomBytes } from 'crypto';

const { RL, User } = rootRequire('./models');

let socket = new SocketEvent();

socket
.namespace('/operator')
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
        link: randomBytes(20).toString('hex'),
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
