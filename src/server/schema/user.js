import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const type = new GraphQLObjectType({
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

export default {
  type,
  resolve(parent, args, socket) {
    return socket.data.user.toObject();
  }
};
