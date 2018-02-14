import { SocketEvent } from 'socket.io-manager';
import { unique } from 'stringing';

const { User, AL } = rootRequire('./models');
const { dbkey } = rootRequire('./config');
const { hmac } = rootRequire('./crypt');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('signup')
.handler(socket => async data => {
  let user = new User({
    name: data.name,
    email: data.email,
    password: hmac(data.password, dbkey),
    status: 0
  });

  try {
    await user.save();

    let al = new AL({
      code: unique(50),
      user: user._id
    });

    await al.save();
    socket.emit('signup', 200);
  } catch (e) {
    socket.emit('signup', 400);
  }
});

export default socket;
