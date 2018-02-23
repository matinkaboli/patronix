import { SocketEvent } from 'socket.io-manager';

import { OperatorToken } from 'Root/models';

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

    socket.emit('relogin', 200,
    {
      user: {
        name: isValid.user.name,
        email: isValid.user.email,
        avatar: isValid.user.avatar.url
      }
    });
  }

  else {
    socket.emit('relogin', 401);
  }

});

export default socket;
