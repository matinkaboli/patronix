const Soket = rootRequire('./Soket.js');

let soket = new Soket('/service');

soket.on('client:message', (socket, nsp) => message => {
  if (socket.data && socket.data.inited && message) {
    let chat = socket.data.chat;

    chat.chats.push({
      sender: 0,
      message
    });

    chat.save().then(() => {
      nsp
      .to(socket.data.site._id.toString())
      .emit('notification', socket.data.site.name);
    });
  }

  else {
    socket.emit('report', { type: 0, text: 0 });
  }
});

export default soket;
