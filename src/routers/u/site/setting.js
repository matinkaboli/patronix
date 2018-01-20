import { Router } from 'express';

const perms = rootRequire('./perms');
const middles = rootRequire('./middles');

const router = new Router();

router.get(
  '/u/site/:id/setting',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    res.render('u/site/setting.njk', { site: req.middle.site });
  }
);

export default router;
