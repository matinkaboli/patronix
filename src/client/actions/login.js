import socket from 'Root/socket';
import { LOGIN } from 'Root/actions';

export default ({ push, ...credentials }) => dispatch => {
  socket.emit('login', credentials);

  socket.once('login', res => {
    if (res.status) {
      localStorage.token = res.token;

      dispatch({
        type: LOGIN,
        ...res.user
      });

      push('/panel');
    } else {
      push('/denied');
    }
  });
};
