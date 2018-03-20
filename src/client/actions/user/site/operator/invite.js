import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default email => {
  socket.once('sites/operators/invite', (status, res) => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'پشتیبان با موفقیت دعوت شد'
      });
    })

    .handle('error', () => {
      if (res === 0) {
        izitoast.error({
          rtl: true,
          title: 'برای اضافه کردن بیشتر از ۳ پشتیبان، حساب ویژه خریداری کنید'
        });
      } else if (res === 1) {
        izitoast.error({
          rtl: true,
          title: 'کاربر پیدا نشد'
        });
      } else if (res === 2) {
        izitoast.error({
          rtl: true,
          title: 'شما از قبل این ایمیل را دعوت کرده اید'
        });
      } else {
        izitoast.error({
          rtl: true,
          title: 'خطا!'
        });
      }
    })
    .status(status);
  });

  socket.emit('sites/operators/invite', email);
};
