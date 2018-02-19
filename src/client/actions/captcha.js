import socket from 'Root/socket';
import store from 'Root/store';
import types from 'Root/actions';

export default () => {
  socket.once('captcha', (status, captcha) => {
    store.dispatch({
      type: types.SET_CAPTCHA,
      captcha
    });
  });

  socket.emit('captcha');
};
