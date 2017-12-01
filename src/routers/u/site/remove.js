import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.post(
  '/u/site/:id/remove',
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site.remove({ _id: req.params.id }).then(() => {
      res.reply.ok();
    });
  }
);

export default router;
