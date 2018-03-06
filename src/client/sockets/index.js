import socket from 'Root/socket';

socket.on('kick', () => {
  socket.disconnect();
  console.log('im gonna leave you alone');
});
