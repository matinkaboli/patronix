import socket from 'Root/socket';
import store from 'Root/store';
import { LOGIN } from 'Root/actions';

export default new Promise(resolve => {
  if (localStorage.token) {
    socket.once('relogin', (res, data) => {
      if (res.status) {
        store.dispatch({
          type: LOGIN,
          name: data.name,
          email: data.email
        });
      } else {
        localStorage.token = null;
      }

      resolve();
    });

    socket.emit('relogin', localStorage.token);
  } else {
    resolve();
  }
});
