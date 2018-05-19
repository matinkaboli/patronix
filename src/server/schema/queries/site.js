import {
  GraphQLID
} from 'graphql';

import authorize from 'Root/authorize';
import siteType from 'Root/schema/types/site';
import { Site } from 'Root/models';
import vatar from 'Root/schema/utils/vatar';

export default {
  type: siteType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  async resolve(parent, args, { shared, socket }) {
    await authorize({ shared, socket });

    let site = await Site.findById(args.id).lean();
    site.id = site._id.toString();
    vatar(site);

    return site;
  }
};
