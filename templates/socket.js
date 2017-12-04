const Socket = rootRequire('./Soket.js');

let socket = new Socket('namepsace');

socket.route('foo', () => () => {

});

export default socket;
