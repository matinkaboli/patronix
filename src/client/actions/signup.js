import izitoast from 'izitoast';

import socket from 'Root/socket';
import ResponseHandler from 'Root/libs/ResponseHandler';

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
