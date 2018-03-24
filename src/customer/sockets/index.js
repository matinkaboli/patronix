import socket from 'Root/socket';
import { dispatch } from 'Root/store';
import types from 'Root/actions';

socket.on('message', message => {
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
