const { Chat } = rootRequire('./models');

export default (next, socket) => () => {
  if (socket.data.chat) {
    Chat.findById(socket.data.chat._id).then(chat => {
      socket.data.chat = chat;

      next();
    });
  }
};
