import { Router } from 'express';

const router = new Router();
const { login } = rootRequire('./perms');

router.get('/', login, (req, res) => {
  res.render('home.njk', {
    success: req.flash('success')
  });
});

export default router;
