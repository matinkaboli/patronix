import izitoast from 'izitoast';

import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default code => dispatch => {
  socket.once('sites/operators/accept', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.site.ACCEPT_OPERATOR
      });

      izitoast.success({
        rtl: true,
        title: 'با موفقیت عضو سایت شدید'
      });
    })
    .status(status);
  });

  socket.emit('sites/operators/accept', code);
};
