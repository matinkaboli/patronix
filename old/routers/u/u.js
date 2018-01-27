import { Router } from 'express';

const router = new Router();
const { logged } = rootRequire('./perms');

router.get('/u', logged, (req, res) => {
  res.render('u/u.njk', { user: req.user.user });
});

export default router;
