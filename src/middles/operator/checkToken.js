const { OperatorToken } = rootRequire('./models');

export default (next, socket) => async() => {
  if (socket.handshake.query.token) {
    let token = await OperatorToken
    .findOne({ token: socket.handshake.query.token });

    if (token) {
      next();
    }
  }
};
