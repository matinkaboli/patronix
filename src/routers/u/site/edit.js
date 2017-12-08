import { Router } from 'express';

const perms = rootRequire('./perms');
const middles = rootRequire('./middles');

const router = new Router();

router.get(
  '/u/site/:id/edit',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    res.render('u/site/edit.njk', { site: req.middle.site});
  }
);

router.post(
  '/u/site/:id/edit',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    req.middle.site.name = req.body.name;

    req.middle.site.save().then(() => {
      res.json({ type: 2, text: 0 });
    }).catch(() => {
      res.json({ type: 0, text: 0 });
    });
  }
);


export default router;
