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

router.get('/recovery', login, (req, res) => {
  res.render('recovery/recovery.njk');
});

router.post('/recovery', login, limiter, (req, res) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        Link.findOne({ user: user._id }).then(link => {
          if (link) {
            // send(req.body.email, link.link, 'forgot', user.fname);

            res.json({ type: 2, text: 0 });
          } else {
            const newLink = new Link({
              link: unique(25),
              user: user._id
            });

            newLink.save().then(() => {
              // send(req.body.email, newLink.link, 'forgot', user.fname);

              res.json({ type: 2, text: 0 });
            }).catch(() => {
              res.json({ type: 0, text: 0 });
            });
          }
        });
      } else {
        res.json({ type: 0, text: 0 });
      }
    });
  } else {
    res.json({ type: 0, text: 0 });
  }
});

export default router;
