const { Chat } = rootRequire('./models');

export default (next, socket) => id => {
  Chat.findById(id).then(chat => {
    let sites = socket.data.user.sites.map(item => item.toString());
    if (!chat.operator.socket && sites.includes(chat.site.toString())) {
      socket.data.chat = chat;

      next();
    }
  }).catch(() => {
    socket.emit('report', { type: 0, text: 0 });
  });
};
