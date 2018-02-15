import socket from 'Root/socket';
import { dispatch } from 'Root/store';
import { LOGIN } from 'Root/actions';
import ResponseHandler from 'Libs/ResponseHandler';

export default new Promise(resolve => {
  if (localStorage.token) {
    socket.once('relogin', (status, res) => {
      let handler = new ResponseHandler();

      handler
      .handle('success', () => {
        dispatch({
          type: LOGIN,
          ...res
        });
      })
      .status(status);

      resolve();
    });

    socket.emit('relogin', localStorage.token);
  }

  else {
    resolve();
  }
});
