import socket from 'Root/socket';
import types from 'Root/actions';
import store from 'Root/store';

export default () => {
  socket.once('captcha', (status, captcha) => {
    store.dispatch({
      type: types.SET_CAPTCHA,
      captcha
    });
  });

  socket.emit('captcha');
};
