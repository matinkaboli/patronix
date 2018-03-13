import socket from 'Root/socket';

socket.on('connect', () => {
  console.log('hello');
});

socket.on('message', message => {
  console.log(message);
});

socket.on('oneUp', () => {
  console.log('yedoone online shode');
});

socket.on('oneDown', () => {
  console.log('yedoone offline shod');
});
