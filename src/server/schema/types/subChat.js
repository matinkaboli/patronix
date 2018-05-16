import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'chat',
  fields: {
    message: {
      type: GraphQLString
    },
    time: {
      type: GraphQLString
    }
  }
});
