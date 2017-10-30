import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
import { generate } from 'stringing';
// import send from '../utils/mail';

const router = new Router();

const loginLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 50,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/login', (req, res) => {
  res.render('login.njk', {
    success: req.flash('success'),
    error: req.flash('error'),
    warn: req.flash('warn'),
    email: req.flash('email')
  });
});

router.post('/login', loginLimiter, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  User.findOne({
    email: req.body.email,
    password: encrypt(req.body.password, req.body.email)
  }).then(user => {
    if (user) {
      if (user.status === 0) {
        Code.findOne({
          user: user._id
        }).then(code => {
          if (code) {
            req.flash('error',
            'برای ورود، شما باید حساب خود را تایید کنید.');
            req.flash('email', req.body.email);
            res.redirect('/code');
          } else {
            const newCode = new Code({
              code: generate(6, { lower: 1, number: 1 }),
              user: user._id
            });
            newCode.save().then(() => {
              // send(req.body.email, newCode.code, 'newcode', user.fname);
              req.flash('error',
              'برای ورود، شما باید حساب خود را تایید کنید.');
              res.redirect('/code');
            }).catch(() => {
              req.flash('error', 'مشکلی پیش آمده، دوباره امتحان کنید.');
              res.redirect('/login');
            });
          }
        });
      } else if (user.status === 1) {
        res.reply.ok({
          message: 'You\'re in.'
        });
      }
    } else {
      req.flash('error', 'چنین حسابی وجود ندارد.');
      res.redirect('/signup');
    }
  });
});

export default router;
