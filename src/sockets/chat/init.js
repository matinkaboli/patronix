const Soket = rootRequire('./Soket.js');
const { Site, Chat } = rootRequire('./models');

let soket = new Soket('/chat');

soket.on('client:init', socket => () => {
  if (!socket.data && !socket.data.inited) {
    socket.data = {};

    Site.findOne({ token: socket.handshake.query.token }).then(site => {
      if (site) {
        socket.data.site = site;

        let chat = new Chat({
          site: site._id,
          client: socket.id
        });

        chat.save().then(() => {
          socket.data.chat = chat;
          socket.data.inited = true;
        });
      } else {
        socket.emit('reply', { type: 500, text: 'fuck u' });
      }
    });
  }
});

export default soket;
