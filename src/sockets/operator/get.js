import { SocketEvent } from 'socket.io-manager';

const middles = rootRequire('./middles');
const routerHandler = rootRequire('./routerHandler');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('get')
.middleware(
  middles.operator.checkToken
)
.handler(socket => data => {
  routerHandler(socket.data.user, data).then(res => {
    socket.emit('get', res);
  });
});

export default socket;
