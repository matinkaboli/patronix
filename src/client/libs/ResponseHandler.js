export default class {
  handle(type, func) {
    this[type] = func;

    return this;
  }

  status(status) {
    switch (status) {
      case 200: {
        this.success();

        break;
      }

      case 404: {
        this.notfound();

        break;
      }

      case 400: {
        this.error();

        break;
      }

      case 403: {
        this.forbidden();

        break;
      }

      case 401: {
        this.unauth();
        
        break;
      }
    }
  }
}
