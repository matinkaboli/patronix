import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default bio => dispatch => {
  socket.once('setting/bio', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.UPDATE_BIO,
        bio
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .status(status);
  });

  socket.emit('setting/bio', bio);
};
