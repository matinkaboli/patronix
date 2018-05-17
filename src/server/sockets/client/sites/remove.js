import { SocketEvent } from 'socket.io-manager';

import middlewares from 'Root/middlewares';
import { Chat, User } from 'Root/models';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/remove')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.checkSite
)
.handler(({ shared, socket }) => async id => {
  await Chat.remove({ site: shared.site._id });

  await shared.site.remove();

  {
    let index = shared.user.ownedSites.findIndex(i =>
      i.toString() === id
    );
    shared.user.ownedSites.splice(index, 1);

    await shared.user.save();
  }

  {
    let operators = [];
    {
      let index = shared.site.operators
      .findIndex(i => i.toString() === shared.site.owner.toString());

      operators = [
        ...shared.site.operators.slice(0, index),
        ...shared.site.operators.slice(index + 1)
      ];
    }

    for (let operator of operators) {
      let user = await User.findById(operator);

      let index = user.operatedSites
      .findIndex(i => i.toString() === id);
      user.operatedSites.splice(index, 1);

      await user.save();
    }
  }

  socket.emit('sites/remove', 200);
});

export default socket;
