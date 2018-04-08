import socket from 'Root/socket';
import types from 'Root/actions';
import { dispatch } from 'Root/store';

export default () => {
  socket.once('captcha', (status, captcha) => {
    dispatch({
      type: types.SET_CAPTCHA,
      captcha
    });
  });

  socket.emit('captcha');
};
