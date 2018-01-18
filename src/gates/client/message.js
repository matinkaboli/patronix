const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/client');

gate
.lane('message')
.guard(
  guards.init,
  guards.client.checkSite,
  guards.client.initChat,
  guards.updateChat,
  guards.rightChat
)
.passenger((socket, nsp, io) => message => {
  let chat = socket.data.chat;

  chat.chats.push({
    message,
    sender: 0
  });

  chat.save().then(() => {
    io
    .of('/operator')
    .to(chat._id.toString())
    .emit('message', message);
  });
});

export default gate;
