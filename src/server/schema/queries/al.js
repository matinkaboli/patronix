import {
  GraphQLString
} from 'graphql';

import alType from 'Root/schema/types/al';
import { AL } from 'Root/models';

export default {
  type: alType,
  args: {
    token: {
      type: GraphQLString
    }
  },
  async resolve(parent, args) {
    return await AL.findOne({ ...args });
  }
};
