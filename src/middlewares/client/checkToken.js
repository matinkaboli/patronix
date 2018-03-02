import { OperatorToken } from 'Root/models';

export default (next, socket) => async () => {
  if (socket.handshake.query.token) {
    let token = await OperatorToken
    .findOne({ token: socket.handshake.query.token })
    .populate('user')
    .exec();

    if (token) {
      socket.data.user = token.user;

      next();
    }

    else {
      socket.handshake.query.token = null;
      socket.emit(socket.eventName, 403);
    }
  }

  else {
    socket.emit(socket.eventName, 403);
  }
};
