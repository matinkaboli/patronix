export default class {
  constructor(namespace = '/') {
    this.namespace = namespace;
    this.routers = [];
  }

  route(name, handler) {
    this.routers.push({ name, handler });
  }

  plug(socket, namespace, io) {
    for (let router of this.routers) {
      socket.on(router.name, router.handler(socket, namespace, io));
    }
  }
}
