import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default (message, id) => dispatch => {
  socket.once('chat/send', (status, res) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.chats.NEW_MESSAGE,
        message,
        res,
        id
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
