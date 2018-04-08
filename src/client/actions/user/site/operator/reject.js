import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default code => dispatch => {
  socket.once('sites/operators/reject', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'با موفقیت حذف شد'
      });

      dispatch({
        type: types.invitations.REJECT,
        code
      });
    })

    .handle('notfound', () => {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    })

    .status(status);
  });

  socket.emit('sites/operators/reject', code);
};
