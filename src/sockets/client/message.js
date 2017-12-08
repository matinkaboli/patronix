const Soket = rootRequire('./Soket.js');

let soket = new Soket('/service');

soket.on('client:message', socket => () => {
  socket;
});

export default soket;
