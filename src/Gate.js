export default class {
  constructor(gate = '/') {
    this.gate = gate;
    this._lane = '';
    this.guards = [];
    this._passenger = () => {};
  }

  guard() {
    this.guards.push(...arguments);

    return this;
  }

  check() {
    return function* (socket, nsp, io) {
      for (let guard of this.guards.values()) {
        yield new Promise(resolve => {
          guard(resolve, socket, nsp, io);
        });
      }
    }.bind(this);
  }

  go(socket, nsp, io, ...args) {
    let iter = this.check()(socket, nsp, io);
    let passenger = this._passenger;

    (function loop() {
      let next = iter.next();

      if (next.done) {
        passenger(socket, nsp, io)(...args);
      } else {
        next.value.then(loop);
      }
    })();
  }

  passenger(passenger) {
    this._passenger = passenger;

    return this;
  }

  lane(lane) {
    this._lane = lane;

    return this;
  }
}
