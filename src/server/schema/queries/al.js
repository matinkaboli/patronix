import {
  GraphQLString
} from 'graphql';

import alType from 'Root/schema/types/rl';
import { AL } from 'Root/models';

export default {
  type: alType,
  args: {
    code: {
      type: GraphQLString
    }
  },
  async resolve(parent, args) {
    return await AL
    .findOne({ ...args })
    .select(['code'])
    .lean();
  }
};
