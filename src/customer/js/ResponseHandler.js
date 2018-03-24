import { dispatch } from 'Root/store';
import types from 'Root/actions';

export default class {
  handle(type, func) {
    this[type] = func;

    return this;
  }

  success() {
  }

  notfound() {
    dispatch({
      type: types.chats.ADD,
      chat: {
        type: 'error',
        sender: 'server',
        text: 'همچین چیزی پیدا نشد.'
      }
    });
  }

  forbidden() {
    dispatch({
      type: types.chats.ADD,
      chat: {
        type: 'error',
        sender: 'server',
        text: 'شما اجازه ای انجام این کار رو ندارید.'
      }
    });
  }

  error() {
    dispatch({
      type: types.chats.ADD,
      chat: {
        type: 'error',
        sender: 'server',
        text: 'خطایی رخ داده است.'
      }
    });
  }

  status(status) {
    let method = 'error';

    switch (status) {
      case 200: {
        method = 'success';
        break;
      }

      case 404: {
        method = 'notfound';
        break;
      }

      case 403: {
        method = 'forbidden';
        break;
      }
    }

    (this[method] || (() => {}))();
  }
}
