export default socket => {
  if (!socket.data.user) {
    throw new Error('unauthorized user');
  }
};
