import ResponseHandler from 'Root/js/ResponseHandler';
import { dispatch } from 'Root/store';
import socket from 'Root/socket';
import types from 'Root/actions';

export default new Promise(resolve => {
  if (localStorage.token) {
    socket.once('relogin', (status, res) => {
      let handler = new ResponseHandler();

      handler
      .handle('success', () => {
        dispatch({
          type: types.user.LOGIN
        });
        res;
      })

      .status(status);

      resolve();
    });

    socket.emit('relogin');
  }

  else {
    resolve();
  }
});
