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

  User.find({
    email: req.body.email,
    password: encrypt(req.body.password, req.body.email)
  }).then(userDoc => {
    if (JSON.stringify(userDoc) === '[]') {
      res.send('User not found');
    } else {
      if (userDoc[0].status === 0) {
        Code.find({ user: userDoc[0]._id }).then(codeDoc => {
          if (JSON.stringify(codeDoc) === '[]') {
            const newCode = new Code({
              code: unique(25),
              user: userDoc[0]._id
            });
            newCode.save().then(() => {
              res.send('You have to verify your fucking email');
            }).catch(() => {
              res.send('Error');
            });
          } else {
            res.send('You have to verify your fucking email');
          }
        }).catch(() => {
          res.send('Error');
        });
      } else {
        res.send('Your account was verified before :)');
      }
    }
  });
});

export default router;
