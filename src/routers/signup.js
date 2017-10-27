import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
import { generate } from 'stringing';

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

  User.findOne({
    email: req.body.email.toLowerCase(),
    password: encrypt(req.body.password, req.body.email)
  }).then(doc => {
    if (doc) {
      // Hasn't verified yet
      if (doc.status === 0) {
        Code.findOne({ user: doc._id }).then(code => {
          // If user has a code
          if (code) {
            res.json(2);
          }

          else {
            // Create a new code
            const newCode = new Code({
              user: doc._id,
              code: generate(6, { lower: 1, number: 1 })
            });

            newCode.save().then(() => {
              res.json(1);
            }).catch(() => {
              res.reply.error({ message: 'error has occured' });
            });
          }
        });
      } else {
        res.reply.error('you have signed up already');
      }
    }

    else {
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
        code: generate(6, { lower: 1, number: 1 }),
        user: user._id
      });

      user.save().then(() => code.save()).then(() => {
        res.json(true);
      }).catch(() => res.json(false));
    }
  });
});

export default router;
