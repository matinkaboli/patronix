import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site } = rootRequire('./models');

const router = new Router();

router.get('/u/sites', perms.basic, (req, res) => {
  Site.find({ owner: req.user.user._id }).then(sites => {
    res.render('u/sites/sites.njk', { sites });
  });
});

export default router;
