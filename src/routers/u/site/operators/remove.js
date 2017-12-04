import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/site/:id/operators/remove',
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    Site
    .findById(req.params.id)
    .populate('operators')
    .exec()
    .then(site => {
      res.render(
        'u/site/operators/remove.njk',
        {
          id: site._id,
          operators: site.operators
        }
      );
    });
  }
);

router.post(
  '/u/site/:id/operators/remove',
  perms.logged,
  perms.u.site.isOwner,
  perms.u.site.operators.remove,
  (req, res) => {
    Site.findById(req.params.id).then(site => {
      let index = 0;
      for (let [i, operator] of site.operators.entries()) {
        if (req.body.id === operator.toString()) {
          index = i;
          break;
        }
      }

      site.operators = [
        ...site.operators.slice(0, index),
        ...site.operators.slice(index + 1, site.operators.length)
      ];

      site.save().then(() => {
        res.reply.ok();
      });
    });
  }
);

export default router;
