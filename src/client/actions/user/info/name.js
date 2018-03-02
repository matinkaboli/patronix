import izitoast from 'izitoast';

import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default ({ name }) => dispatch => {
  socket.once('setting/name', (status, name) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.user.UPDATE_NAME,
        name
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });
    })
    .status(status);
  });

  socket.emit('setting/name', { name });
};
