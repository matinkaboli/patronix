const Socket = rootRequire('./Soket.js');

let socket = new Socket('/chat');

socket.route('message', socket => () => {
  socket;
});

export default socket;
