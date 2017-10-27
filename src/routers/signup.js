import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User } from '../models';
import { encrypt } from '../utils/encrypt';

const router = new Router();

const signupLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 30,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/signup', (req, res) => {
  res.render('signup.njk', {
    error: req.flash('error')
  });
});

router.post('/signup', signupLimiter, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  User.findOne({
    email: req.body.email,
    password: encrypt(req.body.password, req.body.email)
  }).then(doc => {
    if (doc) {
      req.flash('error', 'This account has already signed up');
      res.redirect('/signup');
    } else {
      const user = new User({
        password: encrypt(req.body.password, req.body.email),
        type: 1,
        status: 0,
        email: req.body.email,
        name: {
          first: req.body.fname,
          last: req.body.lname
        }
      });

      user.save().then(() => {
        req.flash(
          'success',
          'Your account has been created successfully.');
        req.flash('email', req.body.email);
        res.redirect('/login');
      }).catch(() => {
        req.flash('error', 'Error happened, try again');
        res.redirect('/signup');
      });
    }
  });
});

export default router;
