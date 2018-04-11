import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { Site } from 'Root/models';
import siteType from './site';

export default new GraphQLObjectType({
  name: 'user',
  fields: {
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    },
    site: {
      type: siteType,
      async resolve(parent, args, socket) {
        return await Site.findOne({
          owner: socket.data.user._id
        }, [
          'name',
          'token'
        ])
        .lean();
      }
    }
  }
});
