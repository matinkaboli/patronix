import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get('/u/sites/add', perms.basic, (req, res) => {
  res.render('sites/add.njk');
});

router.post(
  '/u/sites/add',
  perms.basic,
  perms.sites.add,
  (req, res) => {
    res.send(req.body);
  }
);


export default router;
