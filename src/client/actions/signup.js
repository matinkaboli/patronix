import socket from 'Root/socket';
import { SIGNUP } from 'Root/actions';
import ResponseHandler from 'Libs/ResponseHandler';

export default data => dispatch => {
  socket.once('signup', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      localStorage.token = res.token;

      dispatch({
        type: SIGNUP,
        ...res.user
      });
    })

    .status(status);
  });

  socket.emit('signup', data);
};
