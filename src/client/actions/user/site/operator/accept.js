import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default code => dispatch => {
  socket.once('sites/operators/accept', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.invitations.ACCEPT,
        code
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
