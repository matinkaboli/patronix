import izitoast from 'izitoast';

import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

socket.on('invitation', invitation => {
  izitoast.success({
    rtl: true,
    title: `شما یک دعوت از طرف ${invitation.from} دارید`
  });

  dispatch({
    type: types.invitations.ADD,
    invitation
  });
});


socket.on('operators/leave', operator => {
  izitoast.warning({
    rtl: true,
    title: `پشتیبان ${operator.name} از سایت خارج شد`
  });

  dispatch({
    type: types.sites.LEFT_OPERATOR,
    operator
  });
});


socket.on('operators/join', operator => {
  izitoast.success({
    rtl: true,
    title: `کاربر ${operator.name} دعوت را پذیرفت و عضو پشتیبان های سایت شد`
  });

  dispatch({
    type: types.sites.ADD_OPERATOR,
    operator
  });
});


socket.on('sites/kick', site => {
  izitoast.warning({
    rtl: true,
    title: `شما از سایت ${site.name} حذف شدید`
  });

  dispatch({
    type: types.sites.KICK_OPERATOR,
    site
  });
});


socket.on('sites/join', site => {
  dispatch({
    type: types.sites.OPERATOR_JOINED,
    site
  });
});


socket.on('chat/new', message => {
  izitoast.success({
    rtl: true,
    title: 'شما یک پیام جدید دارید'
  });

  const chatObject = {
    site: 'gohe khar',
    message
  };

  dispatch({
    type: types.chats.ADD,
    chat: chatObject
  });
});


socket.on('chat/message', message => {
  console.log(message);
});
