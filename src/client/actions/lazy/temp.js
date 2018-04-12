import socket from 'Root/socket';
import types from 'Root/actions';
import parse from 'Root/js/parseGraphRes';

export default (query, setState) => dispatch => {
  socket.once('graphql', data => {
    parse(data).then(status => {
      dispatch({
        type: types.lazy.TEMP_STOP,
        status,
        data
      });

      setState({ loading: false });
    });
  });

  dispatch({
    type: types.lazy.START_LOAD
  });

  socket.emit('graphql', query);
};
