export default class {
  constructor(name, session, model) {
    this.name = name;
    this.session = session;
    this.model = model;
    this.user;
  }

  login(user) {
    this.session[this.name] = user._id;
    this.user = user;
  }

  logout() {
    this.session = null;
    this.user = null;
  }

  load() {
    return new Promise(resolve => {
      if (this.session[this.name]) {
        this.model.findOne({ _id: this.session[this.name] }).then(doc => {
          this.user = doc;
          resolve();
        });
      } else {
        this.user = null;
        resolve();
      }
    });
  }

  get logged() {
    return this.user ? true : false;
  }
}
