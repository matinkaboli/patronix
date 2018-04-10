import socket from 'Root/socket';
import types from 'Root/actions';

export default (query, setState) => dispatch => {
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

  socket.emit('graphql', query);
};
