import { SocketEvent } from 'socket.io-manager';

const { User, AL } = rootRequire('./models');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('activate')
.handler(socket => async code => {
  let al = await AL.findOne({ code });

  if (al) {
    let user = await User.findById(al.user);

    user.status = 1;

    await user.save();
    await al.remove();

    socket.emit('activate', { status: true, text: 0 });
  } else {
    socket.emit('activate', { status: false, text: 0 });
  }
});

export default socket;
