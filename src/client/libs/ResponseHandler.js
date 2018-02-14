export default class {
  handle(type, func) {
    this[type] = func;

    return this;
  }

  status(status) {
    switch (status) {
      case 200: {
        return this.success();
      }

      case 404: {
        return this.notfound();
      }

      case 400: {
        return this.error();
      }

      case 403: {
        return this.forbidden();
      }

      case 401: {
        return this.unauth();
      }
    }
  }
}
