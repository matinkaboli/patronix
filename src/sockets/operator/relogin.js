import { SocketEvent } from 'socket.io-manager';

const { OperatorToken } = rootRequire('./models');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('relogin')
.handler(socket => async token => {
  let isValid = await OperatorToken
  .findOne({ token })
  .populate('user')
  .exec();

  if (isValid) {
    socket.data.user = isValid.user;

    socket.handshake.query.token = token;

    socket.emit('relogin', {
      status: true,
      user: {
        name: isValid.user.name,
        email: isValid.user.email,
        avatar: isValid.user.avatar
      }
    });
  }

  else {
    socket.emit('relogin', { status: false, text: 0 });
  }

});

export default socket;
