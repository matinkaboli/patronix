import socket from 'Root/socket';
import { SIGNUP } from 'Root/actions';
import ResponseHandler from 'Libs/ResponseHandler';

export default data => dispatch => {
  socket.once('signup', (status, res) => {
    console.log(res);
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {

      dispatch({
        type: SIGNUP,
        ...res.user
      });
    })

    .status(status);
  });

  socket.emit('signup', data);
};
