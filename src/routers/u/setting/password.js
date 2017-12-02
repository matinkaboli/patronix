import { Router } from 'express';

const router = new Router();
const perms = rootRequire('./perms');
const { User } = rootRequire('./models');
const { encrypt } = rootRequire('./utils');

router.post('/u/setting/password', perms.logged, (req, res) => {
  if (req.body.oldpass && req.body.newpass) {
    User.findOne({ _id: req.session.user }).then(user => {
      if (user) {
        if (encrypt(req.body.oldpass, user.email) === user.password) {
          user.password = encrypt(req.body.newpass, user.email);

          user.save().then(() => {
            req.flash('success', 'رمز شما با موفقیت تغییر یافت.');
            res.redirect('/u');
          }).catch(() => {
            req.flash('error', 'خطا! بعدا امتحان کنید.');
            res.redirect('/setting');
          });
        }
        else {
          req.flash('error', 'رمز وارد شده اشتباه میباشد.');
          res.redirect('/setting');
        }
      } else {
        req.flash('error', 'خطا! بعدا امتحان کنید.');
        res.redirect('/u');
      }
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/setting');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/setting');
  }
});

export default router;
