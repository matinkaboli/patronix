import { Router } from 'express';

const router = new Router();

router.get('/u/logout', (req, res) => {
  req.session.user = null;

  req.flash('success', 'شما با موفقیت از حسابتان خارج شدید.');
  res.redirect('/');
});

export default router;
