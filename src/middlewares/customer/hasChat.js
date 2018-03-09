import { Chat, ClientToken } from 'Root/models';

export default (next, socket, nsp, io) => async message => {
  if (!socket.data.chat) {
    let chat = new Chat({
      site: socket.data.site._id
    });
    await chat.save();
    socket.data.chat = chat;

    let operators = await ClientToken.find({
      user: {
        $in: socket.data.site.operators
      }
    }, { token: 1 });

    for (let { token } of operators) {
      io
      .of('/client')
      .to(token)
      .emit('newchat', message);
    }

    socket.join(chat._id.toString());

    next();
  }

  else {
    let chat = await Chat.findById(socket.data.chat._id);
    socket.data.chat = chat;

    next();
  }
};
