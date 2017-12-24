const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');
const { SocketStore } = rootRequire('./models');

const gate = new Gate('/operator');

gate
.lane('disconnect')
.guard(
  guards.init,
  guards.operator.logged
)
.passenger(socket => () => {
  SocketStore.findOne({ user: socket.data.user._id }).then(store => {
    store.sockets.splice(store.sockets.indexOf(socket.id), 1);

    store.save();
  });
});

export default gate;
