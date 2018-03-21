import izitoast from 'izitoast';

import ResponseHandler from 'Root/js/ResponseHandler';
import types from 'Root/actions';
import socket from 'Root/socket';

export default name => dispatch => {
  socket.once('sites/new', status => {

    let handler = new ResponseHandler();

    handler
    .handle('success', () => {
      dispatch({
        type: types.sites.ADD,
        name
      });

      izitoast.success({
        rtl: true,
        title: 'سایت جدید با موفقیت اضافه شد'
      });
    })

    .handle('error', () => {
      izitoast.error({
        rtl: true,
        title: 'شما بیشتر از یک سایت نمیتوانید درست کنید'
      });
    })

    .status(status);
  });

  socket.emit('sites/new', name);
};
