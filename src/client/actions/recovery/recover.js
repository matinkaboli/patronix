import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import socket from 'Root/socket';

export default (password, push, code) => {
  socket.once('recover', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'رمز شما با موفقیت تغییر پیدا کرد.'
      });

      push('/login');
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'قبلا از این لینک استفاده شده است.'
      });
    })

    .status(status);
  });

  socket.emit('recover', password, code);
};
