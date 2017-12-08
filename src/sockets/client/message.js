const Soket = rootRequire('./Soket.js');

let soket = new Soket('/service');

soket.on('client:message', socket => message => {
  if (socket.data && socket.data.inited) {
    let chat = socket.data.chat;

    chat.chats.push({
      sender: 0,
      message
    });

    console.log(chat.chats);

    // chat.save();
  }

  else {
    socket.emit('report', { type: 0, text: 0 });
  }
});

export default soket;
