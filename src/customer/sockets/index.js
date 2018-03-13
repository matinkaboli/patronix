import socket from 'Root/socket';

socket.on('connect', () => {
  console.log('hello');
});

socket.on('message', message => {
  console.log(message);
});

socket.on('getOnline', () => {
  console.log('yedoone online shode');
});

socket.on('goesOffline', () => {
  console.log('yedoone offline shod');
});
