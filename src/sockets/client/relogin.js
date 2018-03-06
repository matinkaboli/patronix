import { SocketEvent } from 'socket.io-manager';

import { Invitation } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('relogin')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async () => {
  let invitations = await Invitation
  .find({ user: socket.data.user._id })
  .populate({ path: 'from', select: 'name' })
  .exec();

  socket.emit('relogin', 200,
  {
    user: {
      name: socket.data.user.name,
      email: socket.data.user.email,
      avatar: socket.data.user.avatar.url
    },
    invitations: invitations.map(i => ({
      from: i.from.name,
      code: i.code
    }))
  });
});

export default socket;
