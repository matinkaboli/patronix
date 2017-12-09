const Soket = rootRequire('./Soket.js');
const { Site, Chat } = rootRequire('./models');

let soket = new Soket('/service');

soket.on('client:init', socket => () => {
  if (!socket.data) {
    socket.data = {};

    Site.findOne({ token: socket.handshake.query.token }).then(site => {
      if (site) {
        socket.data.site = site;

        let chat = new Chat({
          site: site._id,
          client: socket.id,
          taken: false
        });

        chat.save().then(() => {
          socket.data.chat = chat;
          socket.data.inited = true;
          socket.emit('client:init');
        });
      } else {
        socket.emit('report', { type: 0, text: 0 });
      }
    });
  }
});

export default soket;
