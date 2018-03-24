import { Chat } from 'Root/models';

export default (next, socket) => async () => {
  if (!socket.data.chat) {
    return;
  }

  socket.data.chat = await Chat.findById(socket.data.chat._id);

  if (!socket.data.chat.done) {
    next();
  }
};
