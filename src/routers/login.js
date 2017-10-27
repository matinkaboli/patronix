import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User } from '../models';
import { encrypt } from '../utils/encrypt';

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
  res.render('login.njk');
});

router.post('/login', loginLimiter, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  User.findOne({
    email: req.body.email,
    password: encrypt(req.body.password, req.body.email)
  }).then(user => {
    if (user) {
      res.send('next step');
    } else {
      res.reply.error({ message: 'you have to signup first' });
    }
  });
});

export default router;
