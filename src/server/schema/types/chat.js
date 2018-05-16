import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} from 'graphql';

import { Site } from 'Root/models';
import chatType from './subChat';
import fromSiteType from './fromSite';

export default new GraphQLObjectType({
  name: 'hotChats',
  fields: {
    id: {
      type: GraphQLID
    },
    chats: {
      type: new GraphQLList(chatType),
      resolve(parent) {
        return parent.chats;
      }
    },
    site: {
      type: fromSiteType,
      async resolve(parent) {
        return await Site.findById(parent.site).lean();
      }
    }
  }
});
