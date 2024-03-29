import {
  GraphQLString
} from 'graphql';

import alType from 'Root/schema/types/al';
import { AL } from 'Root/models';

export default {
  type: alType,
  args: {
    code: {
      type: GraphQLString
    }
  },
  async resolve(parent, args) {
    let al = await AL
    .findOne({ ...args })
    .populate({ path: 'user', select: ['status'] });

    if (!al) {
      throw new Error('notfound');
    }

    al.user.status = 1;
    al.user.verifyTime = null;
    await al.user.save();
    await al.remove();

    return { status: true };
  }
};
