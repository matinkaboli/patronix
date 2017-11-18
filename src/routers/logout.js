import { Router } from 'express';
import { auth } from '../utils/UserManager';

const router = new Router();

router.get('/logout', auth, (req, res) => {
  req.session.user = null;
  
  req.flash('success', 'شما با موفقیت از حسابتان خارج شدید.');
  res.redirect('/');
});

export default router;
