import { SocketEvent } from 'socket.io-manager';
import { sign } from 'jsonwebtoken';

const { User, Token } = rootRequire('./models');
const { jwtkey, enkey } = rootRequire('./config');
const { encrypt } = rootRequire('./crypt');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('login')
.handler(socket => async credentials => {
  let user = await User.findOne({ ...credentials, status: true });

  if (user) {
    let token = await Token.findOne({ user: user._id });

    if (token) {
      token.remove();
    }

    token = new Token({
      user: user._id,
      token: sign(
        encrypt(JSON.stringify({ id: user._id }), enkey),
        jwtkey
      )
    });

    await token.save();

    socket.data.user = user;

    socket.emit('login', {
      status: true,
      text: 0
    }, {
      name: user.name,
      email: user.email,
      token: token.token
    });
  } else {
    socket.emit('login', { status: false, text: 0 });
  }
});

export default socket;
