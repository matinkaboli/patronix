import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import recaptcha from 'Root/actions/captcha';
import socket from 'Root/socket';
import types from 'Root/actions';
import gather from 'Root/gather';

export default (credentials, push, captcha) => dispatch => {
  socket.once('login', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', async () => {
      await gather();
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
