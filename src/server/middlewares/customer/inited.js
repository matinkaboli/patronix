export default (next, { socket }) => () => {
  if (socket.inited) {
    next();
  }
};
