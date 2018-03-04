import { ClientToken } from 'Root/models';

export default (next, socket) => async () => {
  console.log(socket.handshake.query);
  if (socket.handshake.query.token) {
    let token = await ClientToken
    .findOne({ token: socket.handshake.query.token })
    .populate('user')
    .exec();

    if (token) {
      socket.data.user = token.user;
      
      if (!socket.token) {
        socket.token = await ClientToken.findById(token._id);
      }

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
