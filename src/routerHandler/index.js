import requireasarray from 'requireasarray';

let routers = requireasarray(__dirname);

export default (user, { path, params }) => {
  for (let router of routers.values()) {
    if (router.path === path) {
      return router.handler(user, params);
    }
  }

  return Promise.resolve({ status: 404 });
};
