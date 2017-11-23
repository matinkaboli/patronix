import { Router } from 'express';
import { User } from '../models';

const router = new Router();

router.post('/delete', (req, res) => {
  User.remove({ _id: req.session.user }).then(() => {
    req.flash('success', 'حساب کاربری با موفقیت حذف شد.');
    res.redirect('/');

  }).catch(() => {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/setting');
  });
});

export default router;
