import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'operator',
  fields: {
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    }
  }
});
