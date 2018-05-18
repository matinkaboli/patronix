import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

export default (id, information) => {
  socket.once('sites/setting/information', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.site.UPDATE_INFORMATION,
        information,
        id
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/information', id, information);
};
