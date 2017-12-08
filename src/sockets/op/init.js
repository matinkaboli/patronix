const Soket = rootRequire('./Soket.js');
const { User, Site } = rootRequire('./models');
const { decrypt } = rootRequire('./utils/crypt');
const { socketkey } = rootRequire('./config.json');

let soket = new Soket('/service');

soket.on('op:init', socket => token => {
  if (!socket.data) {
    socket.data = {};

    User.findById(decrypt(token, socketkey)).then(user => {
      if (user) {
        socket.data.user = user;

        Site.find({ operators: { $in: [user._id] } }).then(sites => {
          for (let site of sites) {
            socket.join(site._id.toString());
          }
        });
      }
    });
  }
});

export default soket;
