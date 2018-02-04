export default (next, socket) => () => {
  if (socket.data.logged) {
    next();
  }
};
