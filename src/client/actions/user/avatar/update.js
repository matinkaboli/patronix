import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default ({ type, size, file }) => dispatch => {
  socket.once('setting/avatar/update', (status, avatar) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.SET_AVATAR,
        avatar
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })

    .status(status);
  });

  socket.emit('setting/avatar/update', { type, file, size });
};
