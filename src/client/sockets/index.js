import izitoast from 'izitoast';

import types from 'Root/actions';
import socket from 'Root/socket';
import store from 'Root/store';

socket.on('invitation', invitation => {
  izitoast.success({
    rtl: true,
    title: `شما یک دعوت از طرف ${invitation.from} دارید`
  });

  store.dispatch({
    type: types.invitations.ADD,
    invitation
  });
});

socket.on('chat/new', message => {
  console.log('we have new chat: ', message);
});

socket.on('chat/message', message => {
  console.log(message);
});

socket.on('operators/leave', operator => {
  console.log('who left?', operator);
});

socket.on('operators/join', operator => {
  console.log('who joined?', operator);
});

socket.on('sites/join', site => {
  console.log('you joined to', site);
});

socket.on('sites/kick', site => {
  console.log('you kicked from', site);
});
