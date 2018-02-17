import socket from 'Root/socket';
import { LOGIN } from 'Root/actions';
import ResponseHandler from 'Root/libs/ResponseHandler';

export default ({ push, failure, ...credentials }) => dispatch => {
  socket.once('login', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      localStorage.token = res.token;

      dispatch({
        type: LOGIN,
        ...res.user
      });

      push('/panel');
    })

    .handle('unauth', failure)

    .status(status);
  });

  socket.emit('login', credentials);
};
