import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { dbkey, url } from 'Root/config';
import { hmac } from 'Root/crypt';
import middlewares from 'Root/middlewares';
import { AL, ClientToken } from 'Root/models';
import sendMail from 'Root/sendMail';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/email')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket }) => async (email, password) => {
  if (hmac(password, dbkey) !== shared.user.password) {
    socket.emit('setting/email', 400, 0);
    return;
  }

  try {
    shared.user.email = email;
    shared.user.status = 0;

    await shared.user.save();

    let al = new AL({
      code: uid(),
      user: shared.user._id
    });

    await al.save();

    await ClientToken.remove({ user: shared.user._id });

    sendMail({
      to: shared.user.email,
      subject: 'فعال سازی اکانت',
      html: `
        برای فعال سازی اکانت بر روی لینک زیر کیلک کنید
        <a href='${url}/activate/${al.code}'></a>
      `
    });

    socket.emit('setting/email', 200);
  } catch (e) {
    socket.emit('setting/email', 400, 1);
  }
});

export default socket;
