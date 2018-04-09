import { Invitation } from 'Root/models';

export const path = '/panel/invitation';

export async function handler(socket) {
  let invitations = await Invitation
  .find({ user: socket.data.user._id })
  .populate({ path: 'from', select: 'name' })
  .exec();

  return {
    status: 200,
    data: invitations.map(i => ({
      from: i.from.name,
      code: i.code
    }))
  };
}
