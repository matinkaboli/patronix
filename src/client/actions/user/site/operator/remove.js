import izitoast from 'izitoast';

import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default email => dispatch => {
  socket.once('sites/operators/remove', (status, res) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.REMOVE_OPERATOR
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت حذف شد'
      });
    })

    .handle('error', () => {
      if (res === 0) {
        izitoast.error({
          rtl: true,
          title: 'چنین کاربری وجود ندارد'
        });
      } else if (res === 1) {
        izitoast.error({
          rtl: true,
          title: 'نمیتوان مدیر سایت را از پشتیبان ها حذف کرد'
        });
      }
    })
    .status(status);
  });

  socket.emit('sites/operators/remove', email);
};
