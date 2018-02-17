import socket from 'Root/socket';
import ResponseHandler from 'Root/libs/ResponseHandler';

export default credentials => {
  socket.once('signup', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      console.log('done');
    })

    .status(status);
  });

  socket.emit('signup', credentials);
};
