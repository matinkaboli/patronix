import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');
const middles = rootRequire('./middles');

const router = new Router();

router.get(
  '/u/site/:id/operators/',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site
    .findById(req.params.id)
    .populate('operators')
    .populate('owner')
    .exec()
    .then(site => {
      res.render(
        'u/site/operators/operators.njk',
        {
          operators: site.operators,
          owner: site.owner
        }
      );
    });
  }
);

export default router;
