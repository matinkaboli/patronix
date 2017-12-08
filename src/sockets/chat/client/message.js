const Soket = rootRequire('./Soket.js');

let soket = new Soket('/chat');

soket.on('client:message', socket => () => {
  socket;
});

export default soket;
