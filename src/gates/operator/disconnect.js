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
  if (socket.data.chat) {
    socket.data.chat.done = true;

    socket.data.chat.save();
  }

  SocketStore.findOne({ user: socket.data.user._id }).then(store => {
    if (store) {
      store.sockets.splice(store.sockets.indexOf(socket.id), 1);

      store.save();
    }
  });
});

export default gate;
