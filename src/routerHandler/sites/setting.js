import { Site } from 'Root/models';

export const path = '/panel/sites/setting';

export async function handler(socket) {
  return {
    status: 200,
    data: {
      site: await Site
      .findOne({ owner: socket.data.user._id })
      .populate({ path: 'operators', select: ['name', 'email'] })
      .exec()
    }
  };
}
