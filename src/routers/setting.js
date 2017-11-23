import { Router } from 'express';
import { User } from '../models';
import { encrypt } from '../utils/encrypt';

const router = new Router();

router.get('/setting', (req, res) => {
  if (req.session.user) {
    User.findOne({ _id: req.session.user }).then(user => {
      if (user) {
        res.render('setting.njk', {
          error: req.flash('error'),
          success: req.flash('success'),
          warn: req.flash('warn'),
          user
        });
      }
      else {
        req.flash('erorr', 'خطا! بعدا امتحان کنید.');
        res.redirect('/u');
      }
    }).catch(() => {
      req.flash('erorr', 'خطا! بعدا امتحان کنید.');
      res.redirect('/u');
    });
  } else {
    req.flash('erorr', 'خطا! بعدا امتحان کنید.');
    res.redirect('/u');
  }
});

router.post('/setting', (req, res) => {
  if (req.body.email &&
      req.body.fname &&
      req.body.lname
  ) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({ _id: req.session.user }).then(user => {
      if (user) {
        user.name.first = req.body.fname;
        user.name.last = req.body.lname;

        if (user.email === req.body.email) {
          user.name.first = req.body.fname;
          user.name.last = req.body.lname;

          user.save().then(() => {
            req.flash('success', 'تغییرات با موفقیت ثبت شد.');
            res.redirect('/u');

          }).catch(() => {
            req.flash('error', 'خطا! بعدا امتحان کنید.');
            res.redirect('/setting');
          });
        } else {
          User.findOne({ email: req.body.email }).then(userEmail => {
            if (userEmail) {
              req.flash('error', 'این ایمیل توسط شخص دیگری استفاده میشود');
              res.redirect('/setting');
            }

            else {
              user.name.first = req.body.fname;
              user.name.last = req.body.lname;
              user.email = req.body.email;

              user.save().then(() => {
                req.flash('success', 'تغییرات با موفقیت ثبت شد.');
                res.redirect('/u');
              }).catch(() => {
                req.flash('error', 'خطا! بعدا امتحان کنید.');
                res.redirect('/setting');
              });
            }
          }).catch(() => {
            req.flash('error', 'خطا! بعدا امتحان کنید.');
            res.redirect('/setting');
          });
        }
      } else {
        req.flash('error', 'خطا! بعدا امتحان کنید.');
        res.redirect('/u');
      }
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/u');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/setting');
  }
});

router.post('/settingpassword', (req, res) => {
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
