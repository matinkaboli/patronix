import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { Invitation, User } from 'Root/models';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/invite')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.hasSite
)
.handler(socket => async email => {
  let user = await User.findOne({ email, status: 1 });
  let operators = socket.data.site.operators.map(i => i.toString());

  if (user && !operators.includes(user._id.toString())) {
    let invitation = await Invitation.findOne({
      user: user._id,
      from: socket.data.site._id
    });

    if (!invitation) {
      invitation = new Invitation({
        user: user._id,
        from: socket.data.site._id,
        code: uid()
      });

      await invitation.save();

      socket.emit('sites/invite', 200);
    }

    else {
      socket.emit('sites/invite', 400);
    }
  }

  else {
    socket.emit('sites/invite', 400);
  }
});

export default socket;
