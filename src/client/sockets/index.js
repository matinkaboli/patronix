import socket from 'Root/socket';

socket.on('invitation', from => {
  console.log('you have a invitation from', from);
});

socket.on('chat/new', message => {
  console.log('we have new chat: ', message);
});

socket.on('chat/message', message => {
  console.log(message);
});

socket.on('invitation', (message, other) => {
  console.log(message, other);
});
