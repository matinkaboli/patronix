import {
  GraphQLObjectType,
  GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
  name: 'al',
  fields: {
    status: {
      type: GraphQLBoolean
    }
  }
});
