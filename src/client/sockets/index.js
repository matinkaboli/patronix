import socket from 'Root/socket';

socket.on('invitation', from => {
  console.log('you have a invitation from', from);
});

socket.on('newchat', message => {
  console.log('we have new chat: ', message);
});

socket.on('message', message => {
  console.log(message);
});

socket.on('increase', () => {
  console.log('much more operator');
});
