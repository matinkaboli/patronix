import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get('/u/logout', perms.basic, (req, res) => {
  req.user.logout();

  res.redirect('/');
});

export default router;
