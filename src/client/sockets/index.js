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

socket.on('operators/leave', operator => {
  izitoast.warning({
    rtl: true,
    title: `پشتیبان ${operator.name} از سایت خارج شد`
  });

  store.dispatch({
    type: types.sites.LEFT_OPERATOR,
    operator
  });
});

socket.on('operators/join', operator => {
  izitoast.success({
    rtl: true,
    title: `کاربر ${operator.name} دعوت را پذیرفت و عضو پشتیبان های سایت شد`
  });

  store.dispatch({
    type: types.sites.ADD_OPERATOR,
    operator
  });
});

socket.on('sites/kick', site => {
  izitoast.warning({
    rtl: true,
    title: `شما از سایت ${site.name} حذف شدید`
  });

  store.dispatch({
    type: types.sites.KICK_OPERATOR,
    site
  });
});

socket.on('sites/join', site => {
  console.log('you joined to', site);
});

socket.on('chat/new', message => {
  console.log('we have new chat: ', message);
});

socket.on('chat/message', message => {
  console.log(message);
});
