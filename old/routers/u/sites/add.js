import { Router } from 'express';
import { generate } from 'stringing';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get('/u/sites/add', perms.logged, (req, res) => {
  res.render('u/sites/add.njk');
});

router.post(
  '/u/sites/add',
  perms.logged,
  perms.u.sites.add,
  (req, res) => {
    let site = new Site({
      name: req.body.name,
      owner: req.user.user._id,
      operators: [req.user.user._id],
      status: 1,
      token: generate(50, { upper: 1, lower: 1, number: 1 })
    });

    site.save().then(() => {
      req.user.user.sites.push(site.id);

      req.user.user.save().then(() => {
        res.json({ type: 2, text: 0 });
      });
    }).catch(() => {
      res.json({ type: 0, text: 0 });
    });
  }
);


export default router;
