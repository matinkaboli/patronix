import { ClientToken } from 'Root/models';

export default (next, socket) => async () => {
  if (socket.handshake.query.token) {
    let token = await ClientToken
    .findOne({ token: socket.handshake.query.token })
    .populate('user')
    .exec();

    if (token) {
      socket.data.user = token.user;
      socket.token = token.token;

      next();
    }

    else {
      socket.handshake.query.token = null;
      socket.token = null;
      socket.emit(socket.eventName, 403);
    }
  }

  else {
    socket.emit(socket.eventName, 403);
  }
};
