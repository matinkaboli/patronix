import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');
const middles = rootRequire('./middles');

const router = new Router();

router.post(
  '/u/site/:id/remove',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site.remove({ _id: req.params.id }).then(() => {
      res.reply.ok();
    });
  }
);

export default router;
