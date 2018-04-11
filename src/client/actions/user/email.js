import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default ({ email, password }) => dispatch => {
  socket.once('setting/email', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.UPDATE_EMAIL,
        email
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'رمز اشتباه است یا ایمیل توسط شخص دیگری استفاده شده است'
      });
    })

    .status(status);
  });

  socket.emit('setting/email', email.toLowerCase(), password);
};
