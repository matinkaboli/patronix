import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default () => dispatch => {
  socket.once('sites/setting/revokeToken', (status, token) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.REVOKE_TOKEN,
        token
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت تغییر پیدا کرد'
      });
    })

    .status(status);
  });

  socket.emit('sites/setting/revokeToken');
};
