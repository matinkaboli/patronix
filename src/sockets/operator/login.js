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
      success: 1,
      name: user.name,
      email: user.email
    }, sign({ user: user._id }, jwtkey));
  } else {
    socket.emit('login', { success: 0 });
  }
});

export default socket;
