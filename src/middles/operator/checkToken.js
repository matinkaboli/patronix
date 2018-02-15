const { OperatorToken } = rootRequire('./models');

export default (next, socket) => async() => {
  if (socket.handshake.query.token) {
    let token = await OperatorToken
    .findOne({ token: socket.handshake.query.token })
    .populate('user')
    .exec();

    if (token) {
      socket.data.user = token.user;

      next();
    }
    
    socket.emit(socket.eventName, 403);
  }

  socket.emit(socket.eventName, 403);
};
