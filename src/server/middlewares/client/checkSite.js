import { Site } from 'Root/models';

export default (next, { shared, socket }) => async id => {
  try {
    let site = await Site.findById(id);

    if (site) {
      shared.site = site;
      next();
    } else {
      socket.emit(socket.eventName, 404);
    }
  }

  catch (e) {
    socket.emit(socket.eventName, 400);
  }
};
