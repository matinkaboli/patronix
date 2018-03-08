import { Chat } from 'Root/models';

export default (next, socket) => async message => {
  if (!socket.data.chat) {
    let chat = new Chat();
    await chat.save();

    socket.data.chat = chat;
    next();
  }

  else {
    next();
  }
};
