import types from 'Root/actions';
import socket from 'Root/socket';

export default dispatch => {
  dispatch({
    type: types.CLEAR
  });

  socket.emit('logout');

  socket.disconnect();
  socket.connect();

  localStorage.token = '';
};
