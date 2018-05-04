import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Invitation } from 'Root/models';

let socket = new SocketEvent();

//// TODO: bug ke age invitation ziad boood, nare toosh operator

socket
.namespace('/client')
.name('sites/operators/accept')
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
    socket.emit('sites/operators/accept', 404);
    return;
  }

  invitation.from.operators.push(invitation.user);
  await invitation.from.save();

  io
  .of('/customer')
  .to(invitation.from._id.toString())
  .emit('increase');

  await invitation.remove();

  nsp
  .to(invitation.from.owner.toString())
  .emit('operators/join', {
    name: socket.data.user.name,
    email: socket.data.user.email
  });

  nsp
  .to(invitation.user.toString())
  .emit('sites/join', {
    name: invitation.from.name,
    _id: invitation.from._id
  });

  socket.emit('sites/operators/accept', 200);
});

export default socket;
