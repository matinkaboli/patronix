import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');
const { url } = rootRequire('./config.json');

const router = new Router();

router.get(
  '/u/site/:id',
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site.findById(req.params.id).then(site => {
      res.render('u/site/site.njk', { token: site.token, url });
    });
  }
);

export default router;
