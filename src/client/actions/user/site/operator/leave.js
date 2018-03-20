import types from 'Root/actions';
import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default id => dispatch => {
  socket.once('sites/operators/leave', (status, res) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.ADD,
        id
      });
    })

    .handle('error', () => {
      console.log(res);
    })

    .status(status);
  });

  socket.emit('sites/operators/leave', id);
};
