import { SocketEvent } from 'socket.io-manager';
import { verify } from 'jsonwebtoken';

const { User, Token } = rootRequire('./models');
const { jwtkey, enkey } = rootRequire('./config');
const { decrypt } = rootRequire('./crypt');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('relogin')
.handler(socket => async token => {
  let isValid = await Token.findOne({ token });

  if (isValid) {
    let user = await User.findById(
      JSON.parse(decrypt(
        verify(token, jwtkey), enkey
      )).id
    );

    if (user) {
      socket.data.user = user;

      socket.handshake.query = {
        ...socket.handshake.query,
        token
      };

      socket.emit('relogin', {
        status: true
      }, {
        name: user.name,
        email: user.email
      });
    }

    else {
      socket.emit('relogin', { status: false, text: 0 });
    }
  }

  else {
    socket.emit('relogin', { status: false, text: 0 });
  }

});

export default socket;
