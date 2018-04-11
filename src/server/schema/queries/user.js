import userType from 'Root/schema/types/user';

export default {
  type: userType,
  resolve(parent, args, socket) {
    let res = socket.data.user.toObject();
    res.avatar = '/static/uploads/' + res.avatar;

    return res;
  }
};
