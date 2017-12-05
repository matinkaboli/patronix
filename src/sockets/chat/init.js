const Socket = rootRequire('./Soket.js');
const { Site, Chat, User } = rootRequire('./models');

let socket = new Socket('/chat');

socket.route('client:init', socket => id => {
  socket.data = {};

  Site.findOne({ token: socket.handshake.query.token }).then(site => {

  });
});

export default socket;
