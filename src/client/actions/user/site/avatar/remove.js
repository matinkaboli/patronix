import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default () => dispatch => {
  socket.once('sites/setting/avatar/remove', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.REMOVE_AVATAR
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت حذف شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/avatar/remove');
};
