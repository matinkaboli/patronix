const Soket = rootRequire('./Soket.js');
const { Chat } = rootRequire('./models');

let soket = new Soket('/service');

soket.on('disconnect', socket => () => {
  if (socket.data && socket.data.inited) {
    if (!socket.data.chat.taken) {
      Chat.remove({ _id: socket.data.chat._id }).then();
    }
  }
});

export default soket;
