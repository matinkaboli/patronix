import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';
import types from 'Root/actions';

export default () => dispatch => {
  socket.once('chat/finish', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'با موفقیت به پایان رسید'
      });

      dispatch({
        type: types.historyChats.NEW
      });

      dispatch({
        type: types.chat.FINISH
      });
    })

    .status(status);
  });

  socket.emit('chat/finish');
};
