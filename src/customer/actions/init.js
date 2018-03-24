import socket from 'Root/socket';
import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';

export default dispatch => {
  dispatch({
    type: types.loading.START
  });

  socket.once('init', status => {
    let res = new ResponseHandler();

    res
    .handle('success', () => {})
    .handle('forbidden', () => {
      dispatch({
        type: types.chats.ADD,
        chat: {
          text: 'سایتی با این مشخصات وجود ندارد',
          sender: 'server',
          type: 'error'
        }
      });
    })
    .status(status);

    dispatch({
      type: types.loading.STOP
    });
  });

  socket.emit('init');
};
