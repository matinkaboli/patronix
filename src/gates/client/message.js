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
  socket.data.chat.chats.push({
    sender: 0,
    message
  });

  socket.data.chat.save().then(() => {
    io
    .of('/operator')
    .to(socket.data.chat._id.toString())
    .emit('message', message);
  }).catch(() => {
    socket.emit('report', { type: 1, text: 0 });
  });
});

export default gate;
