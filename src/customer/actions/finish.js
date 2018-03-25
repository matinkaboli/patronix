import socket from 'Root/socket';
import types from 'Root/actions';
import { dispatch } from 'Root/store';
import ResponseHandler from 'Root/js/ResponseHandler';

export default () => {
  socket.once('finish', status => {
    let res = new ResponseHandler();

    res
    .handle('success', () => {
      dispatch({
        type: types.CLEAR
      });

      dispatch({
        type: types.chats.ADD,
        chat: {
          type: 'error',
          sender: 'server',
          text: 'چت با موفقیت به پایان رسید.'
        }
      });
    })
    .status(status);
  });

  socket.emit('finish');
};
