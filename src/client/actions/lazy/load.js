import socket from 'Root/socket';
import types from 'Root/actions';

export default ({ path, params }, type, setState) => dispatch => {
  socket.once('get', (status, data) => {
    if (type) {
      dispatch({ type, data });
    }

    dispatch({
      type: types.lazy.STOP_LOADING,
      status
    });

    setState({ loading: false });
  });

  dispatch({
    type: types.lazy.START_LOADING
  });

  socket.emit('get', { path, params });
};
