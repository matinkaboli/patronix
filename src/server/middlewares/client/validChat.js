import { Chat } from 'Root/models';

export default (next, { shared, socket }) => async id => {
  try {
    let chat = await Chat
    .findById(id)
    .populate('site')
    .exec();

    if (!chat) {
      socket.emit(shared.eventName, 400, 0);
      return;
    }

    shared.chat = chat;
    next();
  } catch (e) {
    socket.eemit(shared.eventName, 404);
  }
};
