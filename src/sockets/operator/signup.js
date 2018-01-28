import { SocketEvent } from 'socket.io-manager';

const { User } = rootRequire('./models');

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
    socket.emit('signup', { success: 1 });
  }).catch(() => {
    socket.emit('signup', { success: 0, text: 0 });
  });
});

export default socket;
