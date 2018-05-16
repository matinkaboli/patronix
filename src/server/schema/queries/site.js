import {
  GraphQLID
} from 'graphql';

import authorize from 'Root/authorize';
import siteType from 'Root/schema/types/site';
import { Site } from 'Root/models';

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

    return site;
  }
};
