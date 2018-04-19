import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { User } from 'Root/models';
import operatorType from './operator';

export default new GraphQLObjectType({
  name: 'site',
  fields: {
    name: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    operators: {
      type: new GraphQLList(operatorType),
      async resolve(parent) {
        return await User
        .find(
          { _id: parent.operators },
          [
            'name',
            'avatar',
            'email'
          ]
        )
        .lean().map(i => {
          if (i.avatar) {
            i.avatar = '/static/uploads/' + i.avatar;
          }

          return i;
        });
      }
    }
  }
});
