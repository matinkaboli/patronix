import socket from 'Root/socket';
import types from 'Root/actions';

export default (match, query, type, setState) => (dispatch, getState) => {
  let state = getState().lazy.paths;

  if (state.includes(match.path)) {
    setState({ loading: false });
    return;
  }

  socket.once('graphql', (status, data) => {
    dispatch({ type, data });

    dispatch({
      type: types.lazy.CACHE_STOP,
      status,
      path: match.path
    });

    setState({ loading: false });
  });

  dispatch({
    type: types.lazy.START_LOAD
  });

  socket.emit('graphql', query);
};