import { SocketEvent } from 'socket.io-manager';
import { sign } from 'jsonwebtoken';

const { User } = rootRequire('./models');
const { jwtkey } = rootRequire('./config');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('login')
.handler(socket => async credentials => {
  let user = await User.findOne({ ...credentials, status: 1 });

  if (user) {
    socket.data.user = user;
    socket.data.logged = true;

    socket.emit('login', {
      status: 1,
      text: 0
    }, {
      name: user.name,
      email: user.email,
      token: sign({ id: user._id }, jwtkey)
    });
  } else {
    socket.emit('login', { status: 0, text: 0 });
  }
});

export default socket;
