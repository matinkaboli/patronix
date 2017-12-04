const Socket = rootRequire('./Soket.js');

let socket = new Socket('/chat');

socket.route('foo', () => (msg) => {
  console.log(msg);
});

export default socket;
