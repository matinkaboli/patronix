import { SocketEvent } from 'socket.io-manager';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

import { uploadDir } from 'Root/config';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('setting/avatar/update')
.middleware(
  middlewares.client.checkToken
)
.handler(({ shared, socket }) => data => {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  if (
    data.file.length === data.size &&
    data.size < 1048576 &&
    ['jpg', 'jpeg', 'png'].includes(data.type)
  ) {
    let path = resolve(uploadDir, `${shared.user.id}.${data.type}`);
    writeFile(path, data.file, 'binary', async err => {
      if (err) {
        socket.emit('setting/avatar/update', 400);
      }

      else {
        shared.user.avatar =
        `${shared.user._id.toString()}.${data.type}`;

        await shared.user.save();

        socket.emit(
          'setting/avatar/update',
          200,
          '/static/uploads/' +
          `${shared.user.avatar}?${randomBytes(5).toString('hex')}`
        );
      }
    });
  }
});

export default socket;
