import userType from 'Root/schema/types/user';

export default {
  type: userType,
  resolve(parent, args, socket) {
    return socket.data.user.toObject();
  }
};
