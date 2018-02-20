import { LOGOUT } from 'Root/actions';
import socket from 'Root/socket';

export default dispatch => {
  dispatch({
    type: LOGOUT
  });

  socket.emit('logout');

  localStorage.token = '';
};
