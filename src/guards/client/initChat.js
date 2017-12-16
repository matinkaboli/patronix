const { Chat } = rootRequire('./models');

export default (next, socket, nsp) => {
  if (!socket.data.chat) {
    let chat = new Chat({
      site: socket.data.site.id,
      client: socket.id,
      taken: false
    });

    chat.save().then(() => {
      socket.data.chat = chat;

      nsp
      .to(socket.data.site._id.toString())
      .emit('notification', socket.data.chat);

      next();
    }).catch(() => {
      socket.emit('report', { type: 0, text: 0 });
    });
  } else {
    next();
  }
};
