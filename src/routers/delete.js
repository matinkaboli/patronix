import { Router } from 'express';
import { User } from '../models';

const router = new Router();
const perms = rootRequire('./perms');

router.post('/u/setting/delete', perms.basic, (req, res) => {
  if (req.session.user) {
    User.remove({ _id: req.session.user }).then(() => {
      req.flash('success', 'حساب کاربری با موفقیت حذف شد.');
      res.redirect('/');

    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/setting');
    });
  } else {
    res.reply.error({ message: 'Something is wrong!!!' });
  }
});

export default router;
