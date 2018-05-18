import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

export default (id, name) => {
  socket.once('sites/setting/name', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.site.UPDATE_NAME,
        name,
        id
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/name', id, name);
};
