import { SocketEvent } from 'socket.io-manager';
import { verify } from 'jsonwebtoken';

const { User } = rootRequire('./models');
const { jwtkey } = rootRequire('./config');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('relogin')
.handler(socket => async token => {
  try {
    const { id } = verify(token, jwtkey);

    let user = await User.findById(id);

    socket.emit('relogin', {
      status: 1
    }, {
      name: user.name,
      email: user.email
    });
  } catch (e) {
    socket.emit('relogin', { status: 0, text: 0 });
  }
});

export default socket;
