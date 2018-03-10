import izitoast from 'izitoast';

export default class {
  handle(type, func) {
    this[type] = func;

    return this;
  }

  success() {
    izitoast.success({
      rtl: true,
      title: 'موفق'
    });
  }

  notfound() {
    izitoast.error({
      rtl: true,
      title: 'پیدا نشد'
    });
  }

  forbidden() {
    izitoast.warning({
      rtl: true,
      title: 'شما اجازه این کار را ندارید'
    });
  }

  unauth() {
    izitoast.warning({
      rtl: true,
      title: 'اطلاعات مطابقت ندارد'
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

      case 401: {
        method = 'unauth';
        break;
      }
    }

    return this[method]();
  }
}
