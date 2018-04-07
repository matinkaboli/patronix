import socket from 'Root/socket';
import { dispatch } from 'Root/store';
import types from 'Root/actions';

socket.on('recieveMessage', message => {
  dispatch({
    type: types.chats.CLEAR_ERROR
  });

  let time = new Date(message.time);
  dispatch({
    type: types.chats.ADD,
    chat: {
      type: 'message',
      sender: 'server',
      text: message.message,
      time: `${time.getHours()}:${time.getMinutes()}`
    }
  });
});

socket.on('getOnline', () => {
  dispatch({
    type: types.userState.GET_ONLINE
  });
});

socket.on('goesOffline', () => {
  dispatch({
    type: types.userState.GOES_OFFLINE
  });
});

socket.on('decrease', state => {
  if (state === 'offline') {
    dispatch({
      type: types.userState.DECREASE_OFFLINE
    });
    return;
  }

  dispatch({
    type: types.userState.DECREASE_ONLINE
  });
});

socket.on('increase', () => {
  dispatch({
    type: types.userState.INCREASE
  });
});

socket.on('operatorLeft', () => {
  dispatch({
    type: types.CLEAR
  });

  dispatch({
    type: types.chats.ADD,
    chat: {
      type: 'error',
      sender: 'server',
      text: 'اوپراتور از چت روم خارج شد.'
    }
  });
});

socket.on('operatorFinished', () => {
  dispatch({
    type: types.CLEAR
  });

  dispatch({
    type: types.chats.ADD,
    chat: {
      type: 'error',
      sender: 'server',
      text: 'اوپراتور به چت پایان داد.'
    }
  });
});
