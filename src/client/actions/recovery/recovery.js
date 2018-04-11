import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default email => {
  socket.once('recovery', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'ایمیلی حاولی لینک ریکاوری برای شما ارسال شد.'
      });
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'همچین کاربری پیدا نشد.'
      });
    })

    .status(status);
  });

  socket.emit('recovery', email.toLowerCase());
};
