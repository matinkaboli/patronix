import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
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
            res.render('done.njk', {
              type: 'login',
              email: req.body.email
            });
          }
        }).catch(() => {
          req.flash('error', 'خطا! بعدا امتحان کنید.');
          res.redirect('/login');
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
  }).catch(() => {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/login');
  });
});

export default router;
