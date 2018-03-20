import izitoast from 'izitoast';

import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default id => dispatch => {
  socket.once('sites/operators/leave', (status, res) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.operator.LEAVE,
        id
      });
    })

    .handle('error', () => {
      if (res === 0) {
        izitoast.error({
          rtl: true,
          title: 'سایت پیدا نشد'
        });
      } else if (res === 1) {
        izitoast.error({
          rtl: true,
          title: 'شما عضو این سایت نمیباشید'
        });
      } else if (res === 2) {
        izitoast.error({
          rtl: true,
          title: 'خطا! بعدا امتحان کنید'
        });
      } else if (res === 3) {
        izitoast.error({
          rtl: true,
          title: 'شما مدیر این سایت هستید'
        });
      }
    })

    .status(status);
  });

  socket.emit('sites/operators/leave', id);
};
