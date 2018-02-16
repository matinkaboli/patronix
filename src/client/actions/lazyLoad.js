import socket from 'Root/socket';
import types from 'Root/actions';

export default ({ path, params, type }) => dispatch => {
  socket.once('get', (status, data) => {
    dispatch({ type, data });

    dispatch({
      type: types.STOP_LOADING,
      status
    });
  });

  dispatch({
    type: types.START_LOADING
  });

  socket.emit('get', { path, params });
};
