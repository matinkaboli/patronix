import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
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
    sites: {
      type: new GraphQLList(siteType),
      async resolve(parent, args, { shared }) {
        return await Site.find({
          owner: shared.user._id,
        }, [
          'name',
          'token',
          'operators'
        ])
        .lean();
      }
    }
  }
});
