 let token = 'EIWgpY4drzfT7N2lHMJnK9OxDA6tkuvbCVwo1RqBFm3QUjPheL';
 let socketUrl = `http://codeminer:8010/chat?token=${token}`;

let socket = io(socketUrl);

socket.emit('client:init');

socket.on('reply', reply => {
  console.log(reply);
});
