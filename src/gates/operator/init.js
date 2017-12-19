const Gate = rootRequire('./Gate');
const guards = rootRequire('./guards');
const { User } = rootRequire('./models');
const { decrypt } = rootRequire('./utils/crypt');
const { socketkey } = rootRequire('./config.json');

const gate = new Gate('/operator');

gate
.lane('init')
.guard(
  guards.init
)
.passenger(socket => token => {
  User.findById(decrypt(token, socketkey)).then(user => {
    if (user) {
      socket.data.user = user;

      for (let site of user.sites) {
        socket.join(site.toString());
      }
    }
  }).catch(() => {
    socket.emit('report', { type: 0, text: 0 });
  });
});

export default gate;
