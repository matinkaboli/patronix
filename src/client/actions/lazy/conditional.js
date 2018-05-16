import socket from 'Root/socket';
import types from 'Root/actions';
import parse from 'Root/js/parseGraphRes';

export default (match, query, action, setState) => (dispatch, getState) => {
  let state = getState().lazy.paths;

  if (state.includes(match.path)) {
    setState({ loading: false });
    return;
  }

  socket.once('graphql', data => {
    parse(data).then(status => {
      dispatch({
        type: types.lazy.STATUS,
        status
      });

      action(data);

      setState({ loading: false });
    });
  });

  dispatch({
    type: types.lazy.START_LOAD
  });

  socket.emit('graphql', query);
};
