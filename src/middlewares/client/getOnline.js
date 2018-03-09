import { OnlineUser } from 'Root/models';

export default (next, socket) => async () => {
  socket.data.online = await OnlineUser.findOne({ user: socket.data.user._id });

  next();
};
