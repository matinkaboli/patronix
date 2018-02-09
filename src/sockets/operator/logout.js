import { SocketEvent } from 'socket.io-manager';

const middles = rootRequire('./middles');
const { Token } = rootRequire('./models');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('logout')
.middleware(
  middles.operator.checkToken
)
.handler(socket => async() => {
  await Token.remove({ token: socket.handshake.query.token });

  socket.handshake.query.token = '';

  socket.emit('logout', { status: true });
});

export default socket;
