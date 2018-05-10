import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Invitation } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/operators/reject')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket }) => async code => {
  let invitation = await Invitation
  .findOne({ code })
  .exec();

  if (
    !invitation ||
    shared.user._id.toString() !== invitation.user.toString()
  ) {
    socket.emit('sites/operators/accept', 404);
    return;
  }

  await invitation.remove();

  socket.emit('sites/operators/reject', 200);
});

export default socket;
