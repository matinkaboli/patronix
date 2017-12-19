export default (next, socket) => () => {
  socket.data.user ? next() : socket.emit('report', { type: 0, text: 0 });
};
