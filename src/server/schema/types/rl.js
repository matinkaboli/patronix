import {
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'rl',
  fields: {
    status: {
      type: GraphQLBoolean
    }
  }
});
