import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'al',
  fields: {
    code: {
      type: GraphQLString
    }
  }
});
