import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

import { User } from 'Root/models';
import operatorType from './operator';
import vatar from 'Root/schema/utils/vatar';

export default new GraphQLObjectType({
  name: 'site',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    operators: {
      type: new GraphQLList(operatorType),
      async resolve(parent) {
        let users = await User
        .find(
          { _id: parent.operators },
          [
            'name',
            'avatar',
            'email'
          ]
        )
        .lean();

        users = users.map(vatar);

        return users;
      }
    },
    information: {
      type: GraphQLString
    }
  }
});
