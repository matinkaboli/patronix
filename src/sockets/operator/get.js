import { SocketEvent } from 'socket.io-manager';

const middles = rootRequire('./middles');
const { routerHandler } = rootRequire('./routerHandler');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('get')
.middleware(
  middles.operator.get
)
.handler(socket => data => {
  routerHandler(socket.data.user, data).then(res => {
    socket.emit('get', res.status, res.data);
  });
});

export default socket;
