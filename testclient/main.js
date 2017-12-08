 let token = 'AaYx3E8vy0iJtLpubIFPMdqnWg2U1rThw6BkNjeXQcsK7HCol5';
 let socketUrl = `http://codeminer:8010/service?token=${token}`;

let socket = io(socketUrl);

socket.emit('client:init');

socket.on('report', reply => {
  console.log(reply);
});
