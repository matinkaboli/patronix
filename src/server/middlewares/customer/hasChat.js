import { Chat } from 'Root/models';

export default (next, { socket }) => async () => {
  if (!socket.data.chat) {
    return;
  }

  let chat = await Chat.findById(socket.data.chat._id);
  socket.data.chat = chat;

  next();
};
