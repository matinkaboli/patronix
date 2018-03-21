import izitoast from 'izitoast';

import socket from 'Root/socket';

socket.on('invitation', from => {
  izitoast.success({
    rtl: true,
    title: `شما یک دعوت از طرف ${from} دارید`
  });
});

socket.on('chat/new', message => {
  console.log('we have new chat: ', message);
});

socket.on('chat/message', message => {
  console.log(message);
});
