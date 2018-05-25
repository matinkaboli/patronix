import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import { Site } from 'Root/models';
import chatType from './subChat';
import fromSiteType from './fromSite';
import vatar from 'Root/schema/utils/vatar';

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
        let site = await Site.findById(parent.site).lean();
        vatar(site);
        return site;
      }
    },
    done: {
      type: GraphQLBoolean
    },
    taken: {
      type: GraphQLBoolean
    }
  }
});
