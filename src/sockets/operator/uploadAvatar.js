import { SocketEvent } from 'socket.io-manager';
import { writeFile } from 'fs';

const { uploadDir } = rootRequire('./config');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('uploadAvatar')
.handler(socket => bin => {
  console.log(socket.handshake);
});

export default socket;
