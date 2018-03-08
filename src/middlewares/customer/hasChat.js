import { Chat } from 'Root/models';

export default (next, socket) => async message => {
  if (!socket.data.chat) {
    let chat = new Chat({
      site: socket.data.site._id
    });
    await chat.save();

    socket.data.chat = chat;
    next();
  }

  else {
    let chat = await Chat.findById(socket.data.chat._id);
    socket.data.chat = chat;
    
    next();
  }
};
