import { SocketEvent } from 'socket.io-manager';
import { unique } from 'stringing';

const { User, AL } = rootRequire('./models');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('signup')
.handler(socket => async data => {
  let user = new User({
    name: data.name,
    email: data.email,
    password: data.password,
    status: 0
  });

  try {
    await user.save();

    let al = new AL({
      code: unique(30),
      user: user._id
    });

    await al.save();
    socket.emit('signup', { status: true });
  } catch (e) {
    socket.emit('signup', { status: false });
  }
});

export default socket;
