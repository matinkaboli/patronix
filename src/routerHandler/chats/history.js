import { Chat, Site } from 'Root/models';

export const path = '/panel/chats/history';

export async function handler(socket) {
  let site = await Site.findOne({ owner: socket.data.user._id }, { _id: 1 });
  let chats = await Chat
  .find({ site: site._id, done: true }, { _id: 1, chats: 1, operator: 1 })
  .populate({ path: 'operator.id', select: ['email', 'name'] })
  .populate({ path: 'site', select: ['name'] })
  .lean()
  .exec();

  chats = chats.map(i => (
    {
      ...i,
      operator: {
        name: i.operator.id.name,
        email: i.operator.id.email
      }
    }
  ));

  return {
    status: 200,
    data: chats
  };
}
