
export default class {
  handle(type, func) {
    this[type] = func;

    return this;
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

      case 401: {
        method = 'unauth';
        break;
      }
    }

    (this[method] || (() => {}))();
  }
}
