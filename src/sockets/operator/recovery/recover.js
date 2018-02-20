import { SocketEvent } from 'socket.io-manager';

const { RL, User } = rootRequire('./models');
const { hmac } = rootRequire('./crypt');
const { dbkey } = rootRequire('./config');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('recover')
.handler(socket => async(password, code) => {
  let rl = await RL.findOne({ code });

  if (rl) {
    let user = await User.findOne({ _id: rl.user });

    user.password = hmac(password, dbkey);

    await user.save();
    await rl.remove();

    socket.emit('recover', 200);
  }

  else {
    socket.emit('recover', 400);
  }
});

export default socket;
