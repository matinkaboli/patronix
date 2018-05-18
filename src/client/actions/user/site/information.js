import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';
import { dispatch } from 'Root/store';

export default information => {
  socket.once('sites/setting/information', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.UPDATE_INFORMATION,
        information
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/information', information);
};
