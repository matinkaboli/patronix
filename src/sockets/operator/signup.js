import { SocketEvent } from 'socket.io-manager';
import { unique } from 'stringing';

const { User, AL } = rootRequire('./models');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('signup')
.handler(socket => data => {
  let user = new User({
    name: data.name,
    email: data.email,
    password: data.password,
    status: 0
  });

  user.save().then(() => {
    let al = new AL({
      code: unique(30),
      user: user._id
    });

    al.then(() => {
      socket.emit('signup', { success: 1 });
    });
  }).catch(() => {
    socket.emit('signup', { success: 0, text: 0 });
  });
});

export default socket;
