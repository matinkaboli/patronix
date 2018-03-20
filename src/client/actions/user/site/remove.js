import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default push => () => {
  socket.once('sites/remove', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      push('/panel/sites');

      izitoast.success({
        rtl: true,
        title: 'سایت با موفقیت حذف شد'
      });
    })
    .status(status);
  });

  socket.emit('sites/remove');
};
