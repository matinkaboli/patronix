import { dispatch } from 'Root/store';
import socket from 'Root/socket';
import types from 'Root/actions';
import parse from 'Root/js/parseGraphRes';

export default () => new Promise(resolve => {
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

        dispatch({
          type: types.hotChats.LOAD,
          chats: res.data.hotChats
        });
      }

      if (status === 'error') {
        localStorage.token = '';
      }
    });

    resolve();
  });

  socket.emit('graphql', `
  query {
    user {
      bio
      name
      email
      avatar

      sites {
        id
        name
      }
    }

    hotChats {
      id
      done
      taken

      chats {
        message
        time
        sender
      }

      site {
        name
        avatar

        owner {
          name
        }
      }
    }
  }
  `);
});
