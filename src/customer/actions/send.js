import moment from 'moment';

import { dispatch } from 'Root/store';
import socket from 'Root/socket';
import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';

export default message => {
  socket.once('sendMessage', (status, unixTime) => {
    let res = new ResponseHandler();

    res
    .handle('success', () => {
      let time = moment(unixTime);
      dispatch({
        type: types.chats.ADD,
        chat: {
          type: 'message',
          sender: 'customer',
          time: `${time.hour()}:${time.minute()}`,
          text: message
        }
      });
    })

    .handle('error', () => {
      if (unixTime === 1) {
        dispatch({
          type: types.chats.ADD,
          chat: {
            type: 'error',
            sender: 'server',
            text: 'بیش از ۲۵۰ کارکتر نمی توانید بفرستید.'
          }
        });
      }
    })
    .status(status);
  });

  socket.emit('sendMessage', message);
};
