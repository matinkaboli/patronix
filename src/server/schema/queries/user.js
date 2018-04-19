import authorize from 'Root/authorize';
import userType from 'Root/schema/types/user';

export default {
  type: userType,
  resolve(parent, args, socket) {
    authorize(socket);

    let res = socket.data.user.toObject();
    res.avatar = '/static/uploads/' + res.avatar;

    return res;
  }
};
