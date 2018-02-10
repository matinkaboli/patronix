import socket from 'Root/socket';
import { dispatch } from 'Root/store';
import { LOGIN } from 'Root/actions';

export default new Promise(resolve => {
  if (localStorage.token) {
    socket.emit('relogin', localStorage.token);

    socket.once('relogin', res => {
      if (res.status) {
        dispatch({
          type: LOGIN,
          ...res.user
        });
      }

      resolve();
    });
  } else {
    resolve();
  }
});
