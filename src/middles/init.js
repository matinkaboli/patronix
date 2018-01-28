export default (next, socket) => () => {
  if (!socket.data) {
    socket.data = {};
  }

  next();
};
