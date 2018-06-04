import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

export default id => {
  socket.once('chat/take', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'با موفقیت به شما اختصاص داده شد'
      });

      dispatch({
        type: types.hotChats.TAKE,
        id
      });
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    })

    .handle('forbidden', () => {
      izitoast.error({
        rtl: true,
        title: 'شما اجازه این کار را ندارید'
      });
    })

    .status(status);
  });

  socket.emit('chat/take', id);
};
