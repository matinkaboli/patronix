import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

export default (id, { type, size, file }) => {
  socket.once('sites/setting/avatar/update', (status, avatar) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.site.SET_AVATAR,
        avatar,
        id
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/avatar/update', id, { type, file, size });
};
