import { Site } from 'Root/models';

export default (next, socket) => async () => {
  let site = await Site.findOne({ owner: socket.data.user._id });

  if (site) {
    socket.data.site = site;
    next();
  } else {
    socket.emit(socket.eventName, 400);
  }
};
