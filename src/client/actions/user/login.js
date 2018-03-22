import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import recaptcha from 'Root/actions/captcha';
import socket from 'Root/socket';
import types from 'Root/actions';

export default (credentials, push, captcha) => dispatch => {
  socket.once('login', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      localStorage.token = res.token;

      dispatch({
        type: types.user.LOGIN,
        user: res.user
      });

      dispatch({
        type: types.LOGIN_SUCCESS
      });

      dispatch({
        type: types.invitations.LOAD,
        invitations: res.invitations
      });

      push('/panel');
    })

    .handle('unauth', () => {
      recaptcha();

      dispatch({
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
