import requireasarray from 'requireasarray';

export const routers = requireasarray(__dirname);

export function routerHandler(socket, { path, params }) {
  for (let router of routers.values()) {
    if (router.path === path) {
      return router.handler(socket, params);
    }
  }

  return Promise.resolve({ status: 404 });
}
