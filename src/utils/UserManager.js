export default class {
  constructor(session) {
    this.session = session;
    this.status = false;
  }

  login(id) {
    this.session = id;
    this.status = true;
  }

  logout() {
    this.session = null;
    this.status = false;
  }

  get loggedIn() {
    return this.status;
  }
}
