import { Router } from 'express';

const perms = rootRequire('./perms');
const middles = rootRequire('./middles');
const { url } = rootRequire('./config.json');

const router = new Router();

router.get(
  '/u/site/:id',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    res.render('u/site/site.njk', { token: req.middle.site.token, url });
  }
);

export default router;
