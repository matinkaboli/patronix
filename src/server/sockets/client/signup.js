import { SocketEvent } from 'socket.io-manager';
import uid from 'uuid/v4';

import { User, AL } from 'Root/models';
import { dbkey, url } from 'Root/config';
import { hmac } from 'Root/crypt';
import sendMail from 'Root/sendMail';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('signup')
.handler(socket => async (data, captcha) => {
  data.email = data.email.toLowerCase();

  if (captcha.toLowerCase() !== socket.data.captcha) {
    socket.emit('signup', 400, 0);
    return;
  }

  let user = await User.findOne({ email: data.email });
  if (user) {
    socket.emit('signup', 400, 2);
  }

  user = new User({
    name: data.name,
    email: data.email,
    password: hmac(data.password, dbkey),
    status: 0,
    verifyTime: Date.now()
  });

  try {
    await user.save();

    let al = new AL({
      code: uid(),
      user: user._id
    });

    await al.save();

    sendMail({
      to: user.email,
      subject: 'لینک فعال سازی',
      html: `
      برای فعال ساری حساب کاربری خود لینک زیر را لمس کنید
      <a href='${url}/activate/${al.code}'>لینک</a>
      `
    });

    socket.emit('signup', 200);
  } catch (e) {
    socket.emit('signup', 400, 1);
  }
});

export default socket;
