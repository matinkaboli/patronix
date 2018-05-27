import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import { dispatch } from 'Root/store';
import types from 'Root/actions';
import socket from 'Root/socket';

export default id => {
  socket.once('sites/setting/revokeToken', (status, token) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.site.REVOKE_TOKEN,
        token,
        id
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت تغییر پیدا کرد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/revokeToken', id);
};
