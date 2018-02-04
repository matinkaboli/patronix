import { SocketEvent } from 'socket.io-manager';

const logged = rootRequire('./middles/operator/logged');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('get')
.middleware(
  logged
)
.handler(() => () => {

});

export default socket;
