import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';
// import send from '../utils/mail';
const { login } = rootRequire('./perms');

const router = new Router();
const { User, Link } = rootRequire('./models');

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/resend', login, (req, res) => {
  res.render('resend.njk', {
    email: req.flash('email')
  });
});

router.post('/resend', login, limiter, (req, res) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        if (user.status === 0) {
          Link.findOne({ user: user._id }).then(code => {
            if (code) {
              // send(req.body.email, code.link, 'resend', user.fname);

              res.json({ type: 1, text: 1 });
            } else {
              const newLink = new Link({
                user: user._id,
                link: unique(25)
              });

              newLink.save().then(() => {
                // send(req.body.email, newLink.link, 'resend', user.fname);

                // sent
                res.json({ type: 1, text: 1 });
              }).catch(() => {
                // error
                res.json({ type: 0, text: 1 });
              });
            }
          }).catch(() => {
            // error
            res.json({ type: 0, text: 1 });
          });
        } else {
          // verified before
          res.json({ type: 2, text: 0 });
        }
      } else {
        // no such user
        res.json({ type: 0, text: 0 });
      }
    }).catch(() => {
      // error
      res.json({ type: 0, text: 1 });
    });
  } else {
    // error
    res.json({ type: 0, text: 1 });
  }
});

export default router;
