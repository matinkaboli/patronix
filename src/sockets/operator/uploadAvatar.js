import { SocketEvent } from 'socket.io-manager';
import { writeFile, existsSync, mkdirSync } from 'fs';

const { uploadDir } = rootRequire('./config');
const middles = rootRequire('./middles');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('uploadAvatar')
.middleware(
  middles.operator.checkToken
)
.handler(socket => data => {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  console.log(data.file.length, data.size);
});

export default socket;
