import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

export default id => {
  socket.once('sites/setting/avatar/remove', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.site.REMOVE_AVATAR,
        id
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت حذف شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/avatar/remove', id);
};
