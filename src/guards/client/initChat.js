const { Chat } = rootRequire('./models');

export default (next, socket, nsp, io) => () => {
  if (!socket.data.chat) {
    let chat = new Chat({
      site: socket.data.site.id,
      client: socket.id,
      done: false
    });

    chat.save().then(() => {
      socket.data.chat = chat;

      io
      .of('/operator')
      .to(socket.data.site._id.toString())
      .emit('notification', socket.data.chat, socket.data.site);

      socket.join(chat._id.toString());

      next();
    }).catch(() => {
      socket.emit('report', { type: 0, text: 0 });
    });
  } else {
    next();
  }
};
