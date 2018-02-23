import activate from './activate';
import recovery from './recovery';
import setting from './setting';

export const routers = [
  activate,
  recovery,
  setting
];

export function routerHandler(socket, { path, params }) {
  for (let router of routers.values()) {
    if (router.path === path) {
      return router.handler(socket, params);
    }
  }

  return Promise.resolve({ status: 404 });
}
