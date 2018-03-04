import { SocketEvent } from 'socket.io-manager';

import { ClientToken } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('client')
.name('relogin')
.handler(socket => async token => {
  let isValid = await ClientToken
  .findOne({ token })
  .populate('user')
  .exec();

  if (isValid) {
    socket.data.user = isValid.user;
    socket.data.logged = true;

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
    socket.handshake.query.token = null;
    socket.emit('relogin', 401);
  }

});

export default socket;
