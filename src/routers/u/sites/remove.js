import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/sites/remove',
  perms.basic,
  (req, res) => {
    Site.find({ owner: req.user.user._id }).then(sites => {
      res.render('sites/remove.njk', { sites });
    });
  }
);

router.post(
  '/u/sites/remove',
  perms.basic,
  perms.u.sites.remove,
  (req, res) => {
    Site.remove({ _id: req.body.id }).then(() => {
      res.reply.ok();
    });
  }
);

export default router;
