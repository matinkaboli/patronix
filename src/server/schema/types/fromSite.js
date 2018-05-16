import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { User } from 'Root/models';
import operatorType from './operator';
import vatar from 'Root/schema/utils/vatar';

export default new GraphQLObjectType({
  name: 'fromSite',
  fields: {
    name: {
      type: GraphQLString
    },
    owner: {
      type: operatorType,
      async resolve(parent) {
        let user = await User.findById(parent.owner);
        vatar(user);

        return user;
      }
    }
  }
});
