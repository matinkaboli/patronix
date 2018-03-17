import izitoast from 'izitoast';

import socket from 'Root/socket';
import types from 'Root/actions';
import store from 'Root/store';
import recaptcha from 'Root/actions/captcha';
import ResponseHandler from 'Root/js/ResponseHandler';

export default (credentials, push, captcha) => dispatch => {
  socket.once('login', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      localStorage.token = res.token;

      store.dispatch({
        type: types.user.LOGIN,
        ...res.user
      });

      push('/panel');
    })

    .handle('unauth', () => {
      recaptcha();

      store.dispatch({
        type: types.LOGIN_FAILED
      });

      izitoast.error({
        rtl: true,
        title: 'ایمیل یا رمز اشتباه وارد شده است'
      });
    })

    .handle('error', () => {
      recaptcha();

      dispatch({
        type: types.LOGIN_FAILED
      });

      izitoast.error({
        rtl: true,
        title: 'خطا! دوباره امتحان کنید'
      });
    })

    .status(status);
  });

  socket.emit('login', credentials, captcha);
};
