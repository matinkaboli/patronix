import { Router } from 'express';

const router = new Router();
const perms = rootRequire('./perms');

router.get('/u/logout', perms.basic, (req, res) => {
  if (req.session.user) {
    req.session.user = null;
    req.flash('success', 'شما با موفقیت از حسابتان خارج شدید.');
    res.redirect('/');
  } else {
    res.reply.error({ message: 'Something is wrong!!!' });
  }
});

export default router;
