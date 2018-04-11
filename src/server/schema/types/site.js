import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'site',
  fields: {
    name: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    }
  }
});
