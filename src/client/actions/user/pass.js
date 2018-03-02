import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default ({ old, fresh }) => {
  socket.once('setting/password', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {

      izitoast.success({
        rtl: true,
        title: 'با موفقیت به روز رسانی شد'
      });

    })
    .handle('error', () => {

      izitoast.error({
        rtl: true,
        title: 'رمز قبلی اشتباه است'
      });

    })
    .status(status);
  });

  socket.emit('setting/password', old, fresh);
};
