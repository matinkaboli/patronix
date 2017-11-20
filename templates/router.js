import { Router } from 'express';

export default (perms, models, utils) => {
  let { perm } = perms;
  const router = new Router();

  router.get('/@@replacement@@', perm, (req, res) => {
  });

  return router;
};
