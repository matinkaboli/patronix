import { Chat, Site } from 'Root/models';

export const path = '/panel/chats/history';

export async function handler(socket) {
  let site = await Site.findOne({ owner: socket.data.user._id }, { _id: 1 });
  return {
    status: 200,
    data: await Chat.find({ site: site._id, done: true }, { _id: 1, chats: 1 })
  };
}
