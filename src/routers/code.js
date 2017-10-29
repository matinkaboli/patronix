import { Router } from 'express';
import { Code, User } from '../models';

const router = new Router();

router.get('/code', (req, res) => {
  res.render('code.njk', {
    error: req.flash('error'),
    success: req.flash('success'),
    email: req.flash('email')
  });
});
router.post('/code', (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      if (user.status === 0) {
        Code.findOne({
          user: user._id,
        }).then(code => {
          if (code) {
            if (code.code === req.body.code) {
              user.status = 1;
              user.save().then(() => {
                req.flash('success', 'حساب شما با موفقیت تایید شد.');
                res.redirect('/login');
              });
            } else {
              req.flash('error', 'کد اشتباه است.');
              res.redirect('/code');
            }
          } else {
            req.flash('error', 'حساب شما به یک کد جدید نیاز دارد.');
            req.flash('email', req.body.email);
            res.redirect('/login');
          }
        });
      } else {
        req.flash('warn', 'این حساب از قبل تایید شده است.');
        req.flash('email', req.body.email);
        res.redirect('/login');
      }
    } else {
      req.flash('error', 'چنین حسابی وجود ندارد.');
      req.flash('email', req.body.email);
      res.redirect('/signup');
    }
  });
});
export default router;
