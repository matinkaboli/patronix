import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { Invitation, User } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/operators/invite')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler((socket, nsp) => async email => {
  let user = await User.findOne({ email, status: 1 });
  let operators = socket.data.site.operators.map(i => i.toString());

  if (!user || operators.includes(user._id.toString())) {
    socket.emit('sites/operators/invite', 400, 0);
    return;
  }

  let invitation = await Invitation.findOne({
    user: user._id,
    from: socket.data.site._id
  });

  if (invitation) {
    socket.emit('sites/operators/invite', 400, 1);
    return;
  }

  invitation = new Invitation({
    user: user._id,
    from: socket.data.site._id,
    code: uid()
  });

  await invitation.save();

  nsp.to(user._id.toString()).emit('invitation', socket.data.site.name);

  socket.emit('sites/operators/invite', 200);
});

export default socket;