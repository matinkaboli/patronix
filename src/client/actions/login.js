import socket from 'Root/socket';
import { LOGIN } from 'Root/actions';
import ResponseHandler from 'Libs/ResponseHandler';

export default ({ push, ...credentials }) => dispatch => {
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

    .handle('unauth', () => {
      push('/denied');
    })

    .status(status);
  });

  socket.emit('login', credentials);
};
