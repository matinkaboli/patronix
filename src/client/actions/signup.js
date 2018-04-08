import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default (credentials, captcha, push) => {
  socket.once('signup', (status, res) => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'ثبت نام موفقیت آمیز بود',
        message: 'برای ورود ایمیل خود را تایید کنید'
      });

      push('/');
    })

    .handle('error', () => {
      if (res === 0) {
        izitoast.error({
          rtl: true,
          title: 'کد امنیتی وارد شده اشتباه است'
        });
      }

      else if (res === 1) {
        izitoast.error({
          rtl: true,
          title: 'خطا! بعدا امتحان کنید'
        });
      }

      else if (res === 2) {
        izitoast.warning({
          rtl: true,
          title: 'این ایمیل توسط حساب دیگری استفاده میشود'
        });
      }
    })

    .status(status);
  });

  socket.emit('signup', credentials, captcha);
};
