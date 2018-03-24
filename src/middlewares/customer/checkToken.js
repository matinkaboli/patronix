import { Site } from 'Root/models';

export default (next, socket) => async () => {
  if (socket.handshake.query.token) {
    let site = await Site
    .findOne({ token: socket.handshake.query.token })
    .exec();

    if (site) {
      socket.data.site = site;

      next();
    }

    else {
      socket.handshake.query.token = null;
      if (socket.eventName !== 'disconnect') {
        socket.emit(socket.eventName, 400);
      } else {
        socket.disconnect();
      }
    }
  }

  else {
    if (socket.eventName !== 'disconnect') {
      socket.emit(socket.eventName, 400);
    } else {
      socket.disconnect();
    }
  }
};
