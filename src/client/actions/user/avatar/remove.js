import izitoast from 'izitoast';

import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default ({}) => dispatch => {
  socket.once('setting/avatar/remove', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.REMOVE_AVATAR
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت حذف شد'
      });
    })
    .status(status);
  });

  socket.emit('setting/avatar/remove');
};
