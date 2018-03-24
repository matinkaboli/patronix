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

socket.on('decrease', () => {
  console.log('one less operator');
});

socket.on('increase', () => {
  console.log('one more operator');
});
