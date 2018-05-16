import { SocketEvent } from 'socket.io-manager';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

import { uploadDir } from 'Root/config';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('sites/setting/avatar/update')
.middleware(
  middlewares.client.checkToken,
  middlewares.client.checkSite
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
    let path = resolve(uploadDir, `${shared.site.id}.${data.type}`);
    writeFile(path, data.file, 'binary', async err => {
      if (err) {
        socket.emit('sites/setting/avatar/update', 400);
      }

      else {
        shared.site.avatar =
        `${shared.site._id.toString()}.${data.type}`;

        await shared.site.save();

        socket.emit(
          'sites/setting/avatar/update',
          200,
          '/static/uploads/' +
          `${shared.site.avatar}?${randomBytes(5).toString('hex')}`
        );
      }
    });
  }
});

export default socket;
