import { dispatch } from 'Root/store';
import socket from 'Root/socket';
import types from 'Root/actions';
import parse from 'Root/js/parseGraphRes';

export default () => new Promise(resolve => {
  if (localStorage.token) {
    socket.once('graphql', res => {
      parse(res).then(status => {
        if (status === 'success') {
          dispatch({
            type: types.user.LOGIN
          });

          dispatch({
            type: types.user.LOAD,
            data: res.data.user
          });
        }

        if (status === 'forbidden') {
          localStorage.token = null;
        }
      });

      resolve();
    });

    socket.emit('graphql', `
      query {
        user {
          name
          avatar
          email
          sites {
            name
          }
        }
      }
    `);
  }

  else {
    resolve();
  }
});
