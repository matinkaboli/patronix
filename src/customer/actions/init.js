import socket from 'Root/socket';
import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';

export default dispatch => {
  dispatch({
    type: types.loading.START
  });

  socket.once('init', (status, userState) => {
    let res = new ResponseHandler();

    res
    .handle('success', () => {
      dispatch({
        type: types.userState.LOAD,
        userState
      });
    })
    .status(status);

    dispatch({
      type: types.loading.STOP
    });
  });

  socket.emit('init');
};
