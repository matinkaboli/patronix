import { ClientToken } from 'Root/models';

export default async ({ shared, socket }) => {
  if (socket.handshake.query.token) {
    let token = await ClientToken
    .findOne({ token: socket.handshake.query.token })
    .populate('user')
    .exec();

    if (token) {
      socket.data.user = token.user;
      shared.user = token.user;
    }

    else {
      throw new Error('unauthorized user');
    }
  }

  else {
    throw new Error('unauthorized user');
  }
};
