import {
  GraphQLString
} from 'graphql';

import rlType from 'Root/schema/types/rl';
import { RL } from 'Root/models';

export default {
  type: rlType,
  args: {
    code: {
      type: GraphQLString
    }
  },
  async resolve(parent, args) {
    let al = await RL
    .findOne({ ...args })
    .lean();

    if (al) {
      return { status: true };
    }

    throw new Error('notfound');
  }
};
