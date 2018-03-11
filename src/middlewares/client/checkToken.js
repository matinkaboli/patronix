import { ClientToken } from 'Root/models';

export default (next, socket) => async () => {
  if (socket.handshake.query.token) {
    let token = await ClientToken
    .findOne({ token: socket.handshake.query.token })
    .populate('user')
    .exec();

    if (token) {
      socket.data.user = token.user;

      if (!socket.data.token) {
        socket.data.token = await ClientToken.findById(token._id);
      }

      next();
    }

    else {
      socket.handshake.query.token = null;
      socket.data.token = null;
      if (socket.eventName !== 'disconnect') {
        socket.emit(socket.eventName, 403);
      }
    }
  }

  else {
    if (socket.eventName !== 'disconnect') {
      socket.emit(socket.eventName, 403);
    }
  }
};
