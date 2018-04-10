import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import user from './queries/user';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user
    }
  })
});
