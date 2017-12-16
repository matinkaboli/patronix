export default (next, socket) => {
  if (socket.data.chat && !socket.data.chat.taken) {
    next();
  }
};
