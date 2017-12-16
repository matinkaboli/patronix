const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');

const gate = new Gate('/service');

gate
.lane('client:message')
.guard(
  guards.init,
  guards.client.checkSite,
  guards.client.initChat
)
.passenger(socket => message => {
  let chat = socket.data.chat;

  chat.chats.push({
    message,
    sender: 0
  });

  chat.save();
});

export default gate;
