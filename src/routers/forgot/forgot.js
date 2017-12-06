import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';
// import send from '../utils/mail';

const router = new Router();
const { User, Link } = rootRequire('./models');
const { login } = rootRequire('./perms');

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/forgot', login, (req, res) => {
  res.render('forgot/forgot.njk');
});

router.post('/forgot', login, limiter, (req, res) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        Link.findOne({ user: user._id }).then(code => {
          if (code) {
            // send(req.body.email, code.link, 'forgot', user.fname);

            res.json({ type: 's' });
            // sent
          } else {
            const newLink = new Link({
              link: unique(25),
              user: user._id
            });

            newLink.save().then(() => {
              // send(req.body.email, newLink.link, 'forgot', user.fname);

              res.json({ type: 's' });
              // sent
            }).catch(() => {
              res.json({ type: 'e', code: 1 });
              // error
            });
          }
        }).catch(() => {
          res.json({ type: 'e', code: 1 });
          // error
        });
      } else {
        res.json({ type: 'e', code: 0 });
        // no such user
      }
    }).catch(() => {
      res.json({ type: 'e', code: 1 });
      // error
    });
  } else {
    res.json({ type: 'e', code: 1 });
    // error
  }
});

export default router;
