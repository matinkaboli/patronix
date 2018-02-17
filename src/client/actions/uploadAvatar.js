import types from 'Root/actions';
import ResponseHandler from 'Root/libs/ResponseHandler';
import socket from 'Root/socket';

export default ({ type, size, file }) => dispatch => {
  socket.once('uploadAvatar', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.SET_AVATAR,
        avatar: res.url
      });
    })
    .status(status);
  });

  socket.emit('uploadAvatar', { type, file, size });
};
