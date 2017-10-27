import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
import { generate } from 'stringing';

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
    error: req.flash('error')
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
            // now go to /code to enter it
            res.redirect('/code');
          } else {
            const newCode = new Code({
              code: generate(6, { lower: 1, number: 1 }),
              user: user._id
            });
            newCode.save().then(() => {
              res.redirect('/code');
            }).catch(() => {
              req.flash('error', 'Error happened');
              res.redirect('/login');
            });
          }
        });
        // Look at code
      } else if (user.status === 1) {
        res.reply.ok({
          message: 'You\'re in.'
        });
      }
    } else {
      req.flash('error', 'There is no such user');
      res.redirect('/login');
    }
  });
});

export default router;
