import { SocketEvent } from 'socket.io-manager';

const logged = rootRequire('./middles/operator/logged');
const routerHandler = rootRequire('./routerHandler');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('get')
.middleware(
  logged
)
.handler(socket => data => {
  routerHandler(socket.data.user, data).then(res => {
    socket.emit('get', res);
  });
});

export default socket;
