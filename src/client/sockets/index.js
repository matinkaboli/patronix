import izitoast from 'izitoast';

import { dispatch } from 'Root/store';
import history from 'Root/history';
import types from 'Root/actions';
import socket from 'Root/socket';

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


socket.on('operators/leave', (operator, id) => {
  izitoast.warning({
    rtl: true,
    title: `پشتیبان ${operator.name} از سایت خارج شد`
  });

  dispatch({
    type: types.user.sites.LEFT_OPERATOR,
    email: operator.email,
    id
  });
});


socket.on('operators/join', (operator, id) => {
  izitoast.success({
    rtl: true,
    title: `کاربر ${operator.name} دعوت را پذیرفت و عضو پشتیبان های سایت شد`
  });

  dispatch({
    type: types.user.sites.ADD_OPERATOR,
    operator,
    id
  });
});


socket.on('sites/kick', site => {
  izitoast.warning({
    rtl: true,
    title: `شما از سایت ${site.name} حذف شدید`
  });

  dispatch({
    type: types.user.sites.KICK_OPERATOR,
    site
  });
});


socket.on('sites/join', site => {
  dispatch({
    type: types.user.sites.OPERATOR_JOINED,
    site
  });
});


socket.on('chat/new', chat => {
  izitoast.success({
    rtl: true,
    title: 'شما یک پیام جدید دارید'
  });

  dispatch({
    type: types.newChats.NEW,
    chat: {
      _id: chat._id,
      taken: false,
      site: {
        name: chat.from
      },
      chats: [{
        message: chat.message.message,
        sender: 0,
        time: chat.message.time
      }]
    }
  });
});

socket.on('chat/recieve', m => {
  const message = {
    ...m,
    sender: 0,
  };

  dispatch({
    type: types.chat.NEW_MESSAGE,
    message
  });
});

socket.on('chat/customerLeft', () => {
  izitoast.warning({
    rtl: true,
    title: 'کاربر خارج شد'
  });

  history.push('/panel');

  dispatch({
    type: types.chat.FINISH
  });
});

socket.on('chat/customerFinished', () => {
  izitoast.warning({
    rtl: true,
    title: 'کاربر خارج شد'
  });

  history.push('/panel');

  dispatch({
    type: types.chat.FINISH
  });
});

socket.on('graphql', res => {
  console.log(res);
});
