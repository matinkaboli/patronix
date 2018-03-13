import socket from 'Root/socket';

socket.on('message', message => {
  console.log(message);
});

socket.on('getOnline', () => {
  console.log('yedoone online shode');
});

socket.on('goesOffline', () => {
  console.log('yedoone offline shod');
});

socket.on('decrease', () => {
  console.log('one less operator');
});

socket.on('increase', () => {
  console.log('one more operator');
});
