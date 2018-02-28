import izitoast from 'izitoast';

import socket from 'Root/socket';
import types from 'Root/actions';
import ResponseHandler from 'Root/ResponseHandler';

export default ({ push, ...credentials }) => dispatch => {
  socket.once('login', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      localStorage.token = res.token;

      dispatch({
        type: types.user.LOGIN,
        ...res.user
      });

      push('/panel');
    })

    .handle('unauth', () => {
      izitoast.error({
        rtl: true,
        title: 'ایمیل یا رمز اشتباه وارد شده است'
      });
    })

    .status(status);
  });

  socket.emit('login', credentials);
};
