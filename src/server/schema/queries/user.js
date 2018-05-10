import authorize from 'Root/authorize';
import userType from 'Root/schema/types/user';

export default {
  type: userType,
  async resolve(parent, args, { shared, socket }) {
    await authorize({ shared, socket });

    let res = shared.user.toObject();
    if (res.avatar) {
      res.avatar = '/static/uploads/' + res.avatar;
    }

    return res;
  }
};
