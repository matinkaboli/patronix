import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get('/u/sites/add', perms.basic, (req, res) => {
  res.render('u/sites/add.njk');
});

router.post(
  '/u/sites/add',
  perms.basic,
  perms.u.sites.add,
  (req, res) => {
    let site = new Site({
      name: req.body.name,
      owner: req.user.user._id,
      operators: [],
      status: 1
    });

    site.save().then(() => {
      res.reply.ok();
    });
  }
);


export default router;
