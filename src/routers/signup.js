import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
import { unique } from 'stringing';

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
  res.render('signup.njk');
});
router.post('/signup', signupLimiter, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

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

  const code = new Code({
    code: unique(25),
    user: user._id
  });

  user.save().then(() => {
    code.save().then(() => {
      res.send('Good Job');
    }).catch(() => {
      res.send('Erorr happened');
    });
  }).catch(() => {
    res.send('Error happened');
  });
});

export default router;
