const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/operator');

gate
.lane('take')
.guard(
  guards.init,
  guards.operator.logged,
  guards.operator.canTake
)
.passenger(socket => () => {
  let chat = socket.data.chat;

  chat.operator = {
    user: socket.data.user._id,
    socketId: socket.id
  };
  console.log('it gonna save');
  chat.save();
});

export default gate;
