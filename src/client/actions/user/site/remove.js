import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default () => dispatch => {
  socket.once('sites/remove', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.REMOVE
      });

      izitoast.success({
        rtl: true,
        title: 'سایت با موفقیت حذف شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/remove');
};
