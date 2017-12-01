import { Router } from 'express';

const perms = rootRequire('./perms');
const { User, Site } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/site/:id/operators/add',
  perms.basic,
  perms.u.site.isOwner,
  (req, res) => {
    res.render('u/site/operators/add.njk', { id: req.params.id });
  }
);

router.post(
  '/u/site/:id/operators/add',
  perms.basic,
  perms.u.site.isOwner,
  (req, res) => {
    User.findOne({ email: req.body.email }).then(operator => {
      if (operator) {
        Site.findOne({ _id: req.params.id }).then(site => {
          let operators = site.operators;
          operators.push(operator._id);

          Site.updateOne(
            {
              _id: req.params.id
            },
            {
              $set: {
                operators
              }
            }
          ).then(() => {
            res.reply.ok();
          });
        });
      }

      else {
        res.reply.error();
      }
    });
  }
);

export default router;
