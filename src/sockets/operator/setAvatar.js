import { SocketEvent } from 'socket.io-manager';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const { uploadDir } = rootRequire('./config');
const middles = rootRequire('./middles');

let socket = new SocketEvent();

socket
.namespace('/operator')
.name('setAvatar')
.middleware(
  middles.operator.checkToken
)
.handler(socket => data => {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  if (
    data.file.length === data.size &&
    data.size < 512000 &&
    ['jpg', 'png'].includes(data.type)
  ) {
    let path = resolve(uploadDir, `${socket.data.user.id}.${data.type}`);
    writeFile(path, data.file, 'binary', async err => {
      if (err) {
        socket.emit('uploadAvatar', 400);
      }

      else {
        socket.data.user.avatar = {
          path,
          url: `/static/uploads/${socket.data.user._id.toString()}.${data.type}`
        };

        await socket.data.user.save();

        socket.emit('uploadAvatar', 200, { url: socket.data.user.avatar.url });
      }
    });
  }
});

export default socket;