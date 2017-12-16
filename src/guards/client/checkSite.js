const { Site } = rootRequire('./models');

export default (next, socket) => {
  Site.findOne({ token: socket.handshake.query.token }).then(site => {
    if (site) {
      socket.data.site = site;

      next();
    } else {
      socket.emit('report', { type: 0, text: 0 });
    }
  });
};
