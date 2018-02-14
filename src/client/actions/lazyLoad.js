import socket from 'Root/socket';
import types from 'Root/actions';

export default ({ path, params }) => dispatch => {
  socket.once('get', (status, res) => {
    dispatch({
      type: types.STOP_LOADING,
      status,
      data: res
    });
  });

  dispatch({
    type: types.START_LOADING
  });

  socket.emit('get', { path, params });
};
