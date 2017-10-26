import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
import { unique } from 'stringing';

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
  }).then(userDoc => {
    if (userDoc === null) {
      res.reply.notFound({ message: 'User not found' });
    } else {
      if (userDoc.status === 0) {
        Code.findOne({ user: userDoc._id }).then(codeDoc => {
          if (codeDoc === null) {
            const newCode = new Code({
              code: unique(25),
              user: userDoc._id
            });
            newCode.save().then(() => {
              res.reply.ok({
                message: 'You have to verify your fucking email'
              });
            }).catch(() => {
              res.reply.error({ message: 'Error' });
            });
          } else {
            res.reply.ok({
              message: 'You have to verify your fucking email'
            });
          }
        }).catch(() => {
          res.reply.error({ message: 'Error' });
        });
      } else {
        res.reply.ok({
          message: 'Your account was verified before :)'
        });
      }
    }
  });
});

export default router;
