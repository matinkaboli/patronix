import socket from 'Root/socket';

socket.on('kick', () => {
  socket.disconnect();
  console.log('im gonna leave you alone');
});


socket.on('newchat', message => {
  console.log('we have new chat: ', message);
});
