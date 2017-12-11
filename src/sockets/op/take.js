const Soket = rootRequire('./Soket.js');

let soket = new Soket('/service');

soket.on('op:take', () => () => {

});

export default soket;
