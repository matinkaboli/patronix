const Soket = rootRequire('./Soket.js');

let soket = new Soket('/chat');

soket.on('message', socket => () => {
  socket;
});

export default soket;
