import { Router } from 'express';
import { Code, User } from '../models';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';
// import send from '../utils/mail';

const router = new Router();

const codeLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 50,
  delayMs: 0,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/code/:code', codeLimiter, (req, res) => {

  if (req.params.code) {
    Code.findOne({ link: req.params.code }).then(code => {

      if (code) {
        User.findOne({ _id: code.user }).then(user => {

          if (user) {

            user.status = 1;

            user.save().then(() => {
              Code.remove({ link: req.params.code }).then(() => {

                req.flash('success', 'حساب شما با موفقیت تایید گردید.');
                req.flash('email', user.email);
                res.redirect('/login');
              }).catch(() => {
                req.flash('error', 'خطا! بعدا امتحان کنید.');
                res.redirect('/login');
              });
            }).catch(() => {
              req.flash('error', 'خطا! بعدا امتحان کنید.');
              res.redirect('/login');
            });
          } else {
            req.flash('error', 'چنین حسابی وجود ندارد.');
            res.redirect('/signup');
          }
        }).catch(() => {
          req.flash('error', 'خطا! بعدا امتحان کنید.');
          res.redirect('/login');
        });
      } else {
        res.reply.notFound();
      }
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/login');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/login');
  }
});

router.post('/code', codeLimiter, (req, res) => {

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {

        if (user.status === 0) {
          Code.findOne({
            user: user._id
          }).then(code => {
            if (code) {
              // send(user.email, code.link, 'resend', user.fname);

              res.render('done.njk', {
                type: 'resend',
                email: user.email
              });
            } else {

              const newCode = new Code({
                user: user._id,
                link: unique(25)
              });

              newCode.save().then(() => {
                // send(user.email, newCode.link, 'resend', user.fname);

                res.render('done.njk', {
                  type: 'resend',
                  email: user.email
                });
              }).catch(() => {
                req.flash('error', 'خطا! بعدا امتحان کنید.');
                res.redirect('/login');
              });
            }
          }).catch(() => {
            req.flash('error', 'خطا! بعدا امتحان کنید.');
            res.redirect('/signup');
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
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/signup');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/signup');
  }
});

export default router;
