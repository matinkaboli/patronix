import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Invitation } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/operators/accept')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket, nsp, io }) => async code => {
  let invitation = await Invitation
  .findOne({ code })
  .populate('from')
  .exec();

  if (
    !invitation ||
    shared.user._id.toString() !== invitation.user.toString()
  ) {
    socket.emit('sites/operators/accept', 404);
    return;
  }

  if (invitation.from.operators.length > 5) {
    socket.emit('sites/operators/accept', 400);
    return;
  }

  invitation.from.operators.push(invitation.user);
  await invitation.from.save();

  shared.user.operatedSites.push(invitation.from._id);
  shared.user.save();

  io
  .of('/customer')
  .to(invitation.from._id.toString())
  .emit('increase');

  await invitation.remove();

  nsp
  .to(invitation.from.owner.toString())
  .emit('operators/join', {
    name: shared.user.name,
    email: shared.user.email
  });

  nsp
  .to(invitation.user.toString())
  .emit('sites/join', {
    name: invitation.from.name,
    _id: invitation.from._id
  });

  socket.emit('sites/operators/accept', 200, invitation.from._id);
});

export default socket;
