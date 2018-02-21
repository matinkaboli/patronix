import types from 'Root/actions';
import socket from 'Root/socket';

export default dispatch => {
  dispatch({
    type: types.user.LOGOUT
  });

  socket.emit('logout');

  localStorage.token = '';
};
