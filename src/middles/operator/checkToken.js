const { Token } = rootRequire('./models');

export default (next, socket) => async() => {
  if (socket.handshake.query.token) {
    let token = await Token.findOne({ token: socket.handshake.query.token });

    if (token) {
      next();
    }
  }
};
