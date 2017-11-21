import { Router } from 'express';

const { basic } = rootRequire('./perms');

const router = new Router();

router.get('/u/sites/add', basic, (req, res) => {
  res.render('sites/add.njk');
});

export default router;
