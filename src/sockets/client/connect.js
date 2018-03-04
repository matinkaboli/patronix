import { SocketEvent } from 'socket.io-manager';

let socket = new SocketEvent();

socket
.namespace('client')
.name('connect')
.handler(socket => () => {
  console.log(socket.id);
});

export default socket;
