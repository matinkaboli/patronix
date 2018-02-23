const flat = arr => [].concat(...arr.map(v => Array.isArray(v) ? flat(v) : v));

export default flat([
  require('./operator')
]);
