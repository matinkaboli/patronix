import socket from 'Root/socket';
import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';

export default dispatch => {
  dispatch({
    type: types.loading.START
  });

  socket.once('init', status => {
    let res = new ResponseHandler();

    res
    .handle('success', () => {
      dispatch({
        type: types.loading.STOP
      });
    })
    .status(status);
  });

  socket.emit('init');
};
