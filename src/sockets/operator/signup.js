import { SocketEvent } from 'socket.io-manager';

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('signup')
.handler(() => data => {
  console.log(data);
});

export default socket;
