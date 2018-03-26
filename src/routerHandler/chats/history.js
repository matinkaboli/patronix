import { Chat, Site } from 'Root/models';

export const path = '/panel/chats/history';

export async function handler(socket) {
  let site = await Site.find({ owner: socket.data.user._id }, { _id: 1 })._id;
  return {
    status: 200,
    data: await Chat.find({ site, done: true }, { _id: 1 })
  };
}
