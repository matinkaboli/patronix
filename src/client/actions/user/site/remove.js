import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default push => () => {
  socket.once('sites/remove', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'سایت با موفقیت حذف شد'
      });

      push('/panel/sites');
    })
    .status(status);
  });

  socket.emit('sites/remove');
};
