import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'rl',
  fields: {
    code: {
      type: GraphQLString
    }
  }
});
