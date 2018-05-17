import {
  GraphQLList
} from 'graphql';

import authorize from 'Root/authorize';
import chatType from 'Root/schema/types/chat';
import { Chat } from 'Root/models';

export default {
  type: new GraphQLList(chatType),
  async resolve(parent, args, { shared, socket }) {
    await authorize({ shared, socket });

    let chats = await Chat.find({
      site: shared.user.ownedSites,
      done: false,
      taken: false
    }).lean();

    chats = chats.map(i => {
      i.id = i._id.toString();
      return i;
    });

    return chats;
  }
};
