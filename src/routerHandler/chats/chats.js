import { Chat, Site } from 'Root/models';

export const path = '/panel/chats';

export async function handler(socket) {
  let sites = await Site.find({ operator: socket.data.user._id }, { _id: 1 });

  return {
    status: 200,
    data: await Chat.find(
      {
        site: { $in: sites.map(i => i._id) },
        taken: false,
        done: false
      }
    )
  };
}
