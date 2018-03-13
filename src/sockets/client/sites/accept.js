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
.handler((socket, nsp, io) => async code => {
  let invitation = await Invitation
  .findOne({ code })
  .populate('from')
  .exec();

  if (
    !invitation ||
    socket.data.user._id.toString() !== invitation.user.toString()
  ) {
    socket.emit('sites/accept', 404);
    return;
  }

  invitation.from.operators.push(invitation.user);
  await invitation.from.save();

  io
  .of('/customer')
  .to(invitation.from._id.toString())
  .emit('increase');

  await invitation.remove();

  socket.emit('sites/accept', 200);
});

export default socket;
