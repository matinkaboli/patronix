import { Router } from 'express';

const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/logout', logged, (req, res) => {
  req.user.logout();

  res.redirect('/');
});

export default router;
