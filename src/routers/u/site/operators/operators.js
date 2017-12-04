import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/site/:id/operators/',
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site
    .findById(req.params.id)
    .populate('operators')
    .exec()
    .then(site => {
      res.render(
        'u/site/operators/operators.njk',
        { operators: site.operators }
      );
    });
  }
);

export default router;
