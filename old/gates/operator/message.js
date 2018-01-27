const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/operator');

gate
.lane('message')
.guard(
  guards.init,
  guards.operator.logged,
  guards.updateChat,
  guards.rightChat
)
.passenger((socket, nps, io) => message => {
  socket.data.chat.chats.push({
    sender: 1,
    message
  });

  socket.data.chat.save().then(() => {
    io
    .of('/client')
    .to(socket.data.chat._id.toString())
    .emit('message', message);
  }).catch(() => {
    socket.emit('report', { type: 1, text: 0 });
  });
});

export default gate;
