import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default message => dispatch => {
  socket.once('chat/send', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.chat.NEW_MESSAGE,
        message
      });
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    })

    .status(status);
  });

  socket.emit('chat/send', message);
};
