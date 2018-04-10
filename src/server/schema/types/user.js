import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'user',
  fields: {
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  }
});
