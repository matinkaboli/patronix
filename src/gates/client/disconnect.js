const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/service');

gate
.lane('disconnect')
.guard(
  guards.init,
  guards.client.checkSite,
  guards.client.canGetRemoved
)
.passenger(socket => () => {
  socket.data.chat.remove().then();
});

export default gate;
