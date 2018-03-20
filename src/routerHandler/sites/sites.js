import { Site } from 'Root/models';

export const path = '/panel/sites';

export async function handler(socket) {
  return {
    status: 200,
    data: {
      site: await Site.findOne({ owner: socket.data.user._id }),
      sites: await Site.find({
        owner: { $ne: socket.data.user._id },
        operators: socket.data.user._id
      }, {
        name: 1
      })
    }
  };
}
