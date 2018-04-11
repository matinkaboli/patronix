import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'al',
  fields: {
    token: {
      type: GraphQLString
    }
  }
});
