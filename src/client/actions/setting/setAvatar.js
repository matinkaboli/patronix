import types from 'Root/actions';
import ResponseHandler from 'Root/libs/ResponseHandler';
import socket from 'Root/socket';

export default ({ type, size, file }) => dispatch => {
  socket.once('setAvatar', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.setting.SET_AVATAR,
        avatar: res.url
      });
    })
    .status(status);
  });

  socket.emit('setAvatar', { type, file, size });
};
