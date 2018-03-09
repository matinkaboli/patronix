import socket from 'Root/socket';

socket.on('connect', () => {
  console.log('hello');
});

socket.on('message', message => {
  console.log(message);
});
