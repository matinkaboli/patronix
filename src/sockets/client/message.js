const Soket = rootRequire('./Soket.js');

const { Site, Chat } = rootRequire('./models');

let soket = new Soket('/service');

soket.on('client:message', (socket, nsp) => message => {
  new Promise(resolve => {
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

            nsp
            .to(socket.data.site._id.toString())
            .emit('notification', socket.data.site.name);

            resolve();
          });
        }

        else {
          resolve();
        }
      });
    }

    else {
      resolve();
    }
  }).then(() => {
    let chat = socket.data.chat;

    chat.chats.push({
      sender: 0,
      message
    });

    chat.save();
  });
});

export default soket;
