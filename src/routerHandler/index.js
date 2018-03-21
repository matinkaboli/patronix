const flat = arr => [].concat(...arr.map(v => Array.isArray(v) ? flat(v) : v));

const pureRouters = [
  require('./activate'),
  require('./recovery'),
  require('./setting'),
  require('./sites'),
  require('./invitation')
];

export const routers = flat(pureRouters);

export function routerHandler(socket, { path, params }) {
  for (let router of routers.values()) {
    if (router.path === path) {
      return router.handler(socket, params);
    }
  }

  return Promise.resolve({ status: 404 });
}
