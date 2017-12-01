import { Router } from 'express';

const perms = rootRequire('./perms');
const { User, Site } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/site/:id/operators/add',
  perms.logged,
  perms.u.site.isOwner,
  (req, res) => {
    res.render('u/site/operators/add.njk', { id: req.params.id });
  }
);

router.post(
  '/u/site/:id/operators/add',
  perms.logged,
  perms.u.site.isOwner,
  perms.u.site.operators.add,
  (req, res) => {
    User.findOne({ email: req.body.email }).then(operator => {
      if (operator) {
        Site.findOne({ _id: req.params.id }).then(site => {
          site.operators.push(operator._id);

          site.save().then(() => {
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
