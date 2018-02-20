import izitoast from 'izitoast';

import socket from 'Root/socket';
import ResponseHandler from 'Root/libs/ResponseHandler';

export default (password, code) => {
  socket.once('recover', status => {
    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      izitoast.success({
        rtl: true,
        title: 'رمز شما با موفقیت تغییر پیدا کرد.'
      });
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
