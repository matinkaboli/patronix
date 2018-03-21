import socket from 'Root/socket';
import { dispatch } from 'Root/store';
import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';

export default new Promise(resolve => {
  if (localStorage.token) {
    socket.once('relogin', (status, res) => {
      let handler = new ResponseHandler();

      handler
      .handle('success', () => {
        dispatch({
          type: types.user.LOGIN,
          user: res.user
        });

        dispatch({
          type: types.invitations.LOAD,
          invitations: res.invitations
        });
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
