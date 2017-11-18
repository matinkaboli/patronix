import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';
import { User, Code } from '../models';
// import send from '../utils/mail';
import { logged } from '../utils/UserManager';

const router = new Router();

const resendLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/resend', logged, (req, res) => {
  res.render('resend.njk');
});

router.post('/resend', resendLimiter, logged, (req, res) => {

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        if (user.status === 0) {
          Code.findOne({ user: user._id }).then(code => {
            if (code) {
              // send(req.body.email, code.code, 'resend', user.fname);
              res.render('done.njk', {
                type: 'resend',
                email: req.body.email
              });
            } else {

              const newCode = new Code({
                user: user._id,
                code: unique(25)
              });
              newCode.save().then(() => {

                // send(req.body.email, code.code, 'resend', user.fname);

                res.render('done.njk', {
                  type: 'resend',
                  email: req.body.email
                });
              }).catch(() => {
                req.flash('error', 'خطا! بعدا امتحان کنید');
                res.redirect('/resend');
              });
            }
          }).catch(() => {
            req.flash('error', 'خطا! بعدا امتحان کنید');
            res.redirect('/resend');
          });
        } else {
          req.flash('warn', 'این حساب قبلا فعال سازی شده است.');
          res.redirect('/resend');
        }
      } else {
        req.flash('error', 'چنین حسابی وجود ندارد.');
        res.redirect('/resend');
      }
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید');
      res.redirect('/resend');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید');
    res.redirect('/resend');
  }
});

export default router;
