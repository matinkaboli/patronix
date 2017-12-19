const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/client');

gate
.lane('disconnect')
.guard(
  guards.init,
  guards.client.checkSite
)
.passenger(socket => () => {
  if (socket.data.chat) {
    if (!socket.data.chat.operator.socketId) {
      socket.data.chat.remove().then();
    } else {
      socket.data.chat.done = true;

      socket.data.chat.save();
    }
  }
});

export default gate;
