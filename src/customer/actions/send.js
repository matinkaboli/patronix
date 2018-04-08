import { dispatch } from 'Root/store';
import socket from 'Root/socket';
import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';

export default message => {
  socket.once('took', operator => {
    dispatch({
      type: types.operator.LOAD,
      operator
    });
  });

  socket.once('sendMessage', (status, unixTime) => {
    let res = new ResponseHandler();

    res
    .handle('success', () => {
      dispatch({
        type: types.chats.CLEAR_ERROR
      });

      let time = new Date(unixTime);
      dispatch({
        type: types.chats.ADD,
        chat: {
          type: 'message',
          sender: 'customer',
          time: `${time.getHours()}:${time.getMinutes()}`,
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
