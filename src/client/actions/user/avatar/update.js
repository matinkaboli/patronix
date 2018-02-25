import izitoast from 'izitoast';

import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
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
        title: 'با موفقبت آپلود شد.'
      });
    })
    .status(status);
  });

  socket.emit('setting/avatar/update', { type, file, size });
};
