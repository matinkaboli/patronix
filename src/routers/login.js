import { Router } from 'express';
import RateLimit from 'express-rate-limit';

const { User } = rootRequire('./models');
const { encrypt } = rootRequire('./utils/encrypt');

const router = new Router();

const limiter = new RateLimit({
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

router.post('/login', limiter, (req, res) => {
  User.findOne({
    email: req.body.email,
    password: encrypt(req.body.password, req.body.email),
    status: { $in: [0, 1, 2] }
  }).then(user => {
    if (user) {
      if (user.status === 0) {
        res.reply.error({ message: 'unverified user' });
      }

      else if (user.status === 1) {
        req.user.login(user);
        res.reply.ok();
      }

      else if (user.status === 2) {
        res.reply.error({ message: 'your account has expired' });
      }
    }

    else {
      res.reply.error({ message: 'no such user' });
    }
  });
});

export default router;
