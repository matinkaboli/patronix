import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Invitation } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/accept')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => async code => {
  let invitation = await Invitation
  .findOne({ code })
  .populate('from')
  .exec();

  if (
    invitation &&
    socket.data.user._id.toString() === invitation.user.toString()
  ) {
    invitation.from.operators.push(invitation.user);
    await invitation.from.save();
    await invitation.remove();

    socket.emit('sites/accept', 200);
  }

  else {
    socket.emit('sites/accept', 404);
  }
});

export default socket;
