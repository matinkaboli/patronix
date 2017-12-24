export default (next, socket) => () => {
  if (socket.data.user) {
    next();
  }
};
