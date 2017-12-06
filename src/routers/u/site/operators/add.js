import { Router } from 'express';

const perms = rootRequire('./perms');
const { User } = rootRequire('./models');
const middles = rootRequire('./middles');

const router = new Router();

router.get(
  '/u/site/:id/operators/add',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    res.render('u/site/operators/add.njk', { id: req.params.id });
  }
);

router.post(
  '/u/site/:id/operators/add',
  middles.u.site.getSite,
  perms.logged,
  perms.u.site.isOwner,
  perms.u.site.operators.add,
  (req, res) => {
    User.findOne({ email: req.body.email }).then(operator => {
      if (operator) {
        req.middle.site.operators.push(operator._id);

        req.middle.site.save().then(() => {
          res.reply.ok();
        });
      }

      else {
        res.reply.error();
      }
    });
  }
);

export default router;
