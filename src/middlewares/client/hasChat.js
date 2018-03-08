export default (next, socket) => () => {
  if (socket.data.chat) {
    next();
  }
};
