import socket from 'Root/socket';
import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';

export default ({ push, failure, ...credentials }) => dispatch => {
  socket.once('login', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      localStorage.token = res.token;

      dispatch({
        type: types.user.LOGIN,
        ...res.user
      });

      push('/panel');
    })

    .handle('unauth', failure)

    .status(status);
  });

  socket.emit('login', credentials);
};
