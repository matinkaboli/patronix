import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';
import types from 'Root/actions';

export default (chat, push) => dispatch => {
  socket.once('chat/finish', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'با موفقیت به پایان رسید'
      });

      dispatch({
        type: types.chat.FINISH
      });

      dispatch({
        type: types.historyChats.NEW,
        chat
      });

      push('/panel');
    })

    .status(status);
  });

  socket.emit('chat/finish');
};
