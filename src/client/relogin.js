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
          type: types.user.LOGIN,
          user: res.user
        });

        dispatch({
          type: types.invitations.LOAD,
          invitations: res.invitations
        });

        dispatch({
          type: types.sites.LOAD,
          data: res.sites
        });

        localStorage.setItem('patronixUrl', res.url);
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
