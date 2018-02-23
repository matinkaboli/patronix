export const routers = [
  require('./activate'),
  require('./recovery'),
  require('./setting')
];

export function routerHandler(socket, { path, params }) {
  for (let router of routers.values()) {
    if (router.path === path) {
      return router.handler(socket, params);
    }
  }

  return Promise.resolve({ status: 404 });
}
