const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');
const { User, SocketStore } = rootRequire('./models');
const { decrypt } = rootRequire('./utils/crypt');
const { socketkey } = rootRequire('./config.json');

const gate = new Gate('/operator');

gate
.lane('setup')
.guard(
  guards.init
)
.passenger((socket, nsp) => token => {
  let session = socket
    .handshake
    .headers
    .cookie
    .split(';')
    .map(item => item.trim())
    .find(item => item.split('=')[0] === 'connect.sid')
    .split('=')[1];

  User.findById(decrypt(token, socketkey)).then(user => {
    if (user) {
      SocketStore.findOne({ user: user._id }).then(store => {
        if (store) {
          if (store.session === session) {
            store.sockets.push(socket.id);

            store.save().then(() => {
              socket.data.user = user;
            });

          } else {
            for (let sock of store.sockets) {
              if (nsp.sockets[sock]) {
                nsp.sockets[sock].disconnect();
              }
            }

            store.remove().then(() => {
              let newStore = new SocketStore({
                user: user._id,
                session,
                socket: socket.id
              });

              newStore.save();
            });
          }
        }

        else {
          let newStore = new SocketStore({
            user: user._id,
            session,
            sockets: [socket.id]
          });

          newStore.save().then(() => {
            socket.data.user = user;
          });
        }
      });

      for (let site of user.sites) {
        socket.join(site.toString());
      }
    }
  }).catch(() => {
    socket.emit('report', { type: 0, text: 0 });
  });
});

export default gate;
