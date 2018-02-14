import { SocketEvent } from 'socket.io-manager';

const { User, OperatorToken } = rootRequire('./models');
const { otkey, dbkey } = rootRequire('./config');
const { hmac } = rootRequire('./crypt');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('login')
.handler(socket => async credentials => {
  let user = await User.findOne({
    ...credentials,
    password: hmac(credentials.password, dbkey),
    status: true
  });

  if (user) {
    let token = await OperatorToken.findOne({ user: user._id });

    if (token) {
      token.remove();
    }

    token = new OperatorToken({ user: user._id });
    token.token = hmac(token._id, otkey);

    await token.save();

    socket.data.user = user;

    socket.emit('login', {
      status: true,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: token.token
    });
  } else {
    socket.emit('login', { status: false, text: 0 });
  }
});

export default socket;
