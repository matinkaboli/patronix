import { Site } from 'Root/models';

export const path = '/panel/sites';

export async function handler(socket) {
  let sites = await Site.find({ owner: socket.data.user._id });
  
  return {
    status: 200,
    data: sites
  };
}
