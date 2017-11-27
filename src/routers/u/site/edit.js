import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get(
  '/u/site/:name/edit',
  perms.basic,
  (req, res) => {
    res.send('shit');
});

export default router;
