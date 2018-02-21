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
    status: 1
  });

  if (user) {
    let token = await OperatorToken.findOne({ user: user._id });

    if (token) {
      token.remove();
    }

    token = new OperatorToken({ user: user._id });
    token.token = hmac(token._id.toString(), otkey);

    await token.save();

    socket.data.user = user;

    socket.emit('login', 200, {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar.url
      },
      token: token.token
    });
  }

  else {
    socket.emit('login', 401);
  }
});

export default socket;
