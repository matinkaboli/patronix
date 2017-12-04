const Socket = rootRequire('./Socket.js');

let socket = new Socket('namepsace');

socket.route('foo', () => () => {

});

export default socket;
