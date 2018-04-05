import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default message => dispatch => {
  socket.once('chat/send', (status, time) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      const m = {
        time,
        text: message,
        sender: 1
      };

      dispatch({
        type: types.chat.NEW_MESSAGE,
        message: m
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
