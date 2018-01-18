const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/operator');

gate
.lane('message')
.guard(
  guards.init,
  guards.operator.logged,
  guards.operator.rightChat
)
.passenger(socket => message => {
  socket.data.chat.chats.push({ sender: 1, message });

  socket.data.chat.save();
});

export default gate;
