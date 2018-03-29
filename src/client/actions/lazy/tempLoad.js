import socket from 'Root/socket';
import types from 'Root/actions';

export default (match, setState) => dispatch => {
  socket.once('get', (status, data) => {
    dispatch({
      type: types.lazy.TEMP_LOAD,
      status,
      data
    });

    setState({ loading: false });
  });

  dispatch({
    type: types.lazy.START_LOAD
  });

  socket.emit('get', { path: match.path, params: match.params });
};
