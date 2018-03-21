import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default (credentials, captcha) => {
  socket.once('signup', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'ثبت نام موفقیت آمیز بود'
      });
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'اطلاعات صحیح وارد شود'
      });
    })

    .status(status);
  });

  socket.emit('signup', credentials, captcha);
};
