export default class {
  constructor(namespace = '/') {
    this.namespace = namespace;
    this.events = [];
  }

  on(name, handler) {
    this.events.push({ name, handler });
  }

  plug(socket, namespace, io) {
    for (let e of this.events) {
      socket.on(e.name, e.handler(socket, namespace, io));
    }
  }
}
