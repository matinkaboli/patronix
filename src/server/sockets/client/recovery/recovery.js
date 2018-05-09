import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { RL, User } from 'Root/models';
import sendMail from 'Root/sendMail';
import { url } from 'Root/config';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('recovery')
.handler(({ socket }) => async email => {
  let user = await User.findOne({ email });

  if (!user) {
    socket.emit('recovery', 400);
    return;
  }

  let rl = await RL.findOne({ user: user._id });

  if (rl) {
    // resend email

    socket.emit('recovery', 200);
    return;
  }

  rl = new RL({
    code: uid(),
    user: user._id
  });

  await rl.save();

  sendMail({
    to: user.email,
    subject: 'بازیابی پسورد',
    html: `
      برای بازیابی پسورد بر روی لینک زیر کلیک کنید
      <a href='${url}/recovery/${rl.code}'>Link</a>
    `
  });

  socket.emit('recovery', 200);
});

export default socket;
