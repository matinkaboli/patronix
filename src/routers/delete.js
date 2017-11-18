import { Router } from 'express';
import { auth } from '../utils/UserManager';
import { User } from '../models';

const router = new Router();

router.post('/delete', auth, (req, res) => {

  User.findOne({ _id: req.session.user }).then(user => {
    user.status = 3;

    user.save().then(() => {
      req.session.user = null;
      
      req.flash('success', 'حساب کاربری با موفقیت حذف شد.');
      res.redirect('/');

    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/setting');
    });
  }).catch(() => {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/setting');
  });
});

export default router;
