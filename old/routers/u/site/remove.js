import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site, Chat } = rootRequire('./models');
const middles = rootRequire('./middles');

const router = new Router();

router.post(
  '/u/site/:id/remove',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site.remove({ _id: req.params.id }).then(() => {
      Chat.remove({ site: req.params.id }).then(() => {
        res.json({ type: 2, text: 0 });
      });
    }).catch(() => {
      res.json({ type: 0, text: 0 });
    });
  }
);

export default router;
