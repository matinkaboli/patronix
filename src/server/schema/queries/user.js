import authorize from 'Root/authorize';
import userType from 'Root/schema/types/user';
import vatar from 'Root/schema/utils/vatar';

export default {
  type: userType,
  async resolve(parent, args, { shared, socket }) {
    await authorize({ shared, socket });

    let res = shared.user.toObject();
    vatar(res);

    return res;
  }
};
