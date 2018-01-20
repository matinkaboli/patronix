import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';

// import send from '../utils/mail';
const { User, Link } = rootRequire('./models');
const { encrypt } = rootRequire('./utils/crypt');
const { login } = rootRequire('./perms');
const { dbkey } = rootRequire('./config.json');
const { validateEmail } = rootRequire('./utils/validate');

const router = new Router();

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 30,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/signup', login, (req, res) => {
  res.render('signup.njk');
});

router.post('/signup', login, limiter, (req, res) => {
  if (validateEmail(req.body.email) && req.body.password.length > 7) {
    req.body.email = req.body.email.toLowerCase();

    if (req.body.captcha.toLowerCase() === req.session.captcha) {
      const user = new User({
        password: encrypt(req.body.password, req.body.email + dbkey),
        type: 1,
        status: 0,
        email: req.body.email,
        name: {
          first: req.body.fname,
          last: req.body.lname
        }
      });

      user.save().then(() => {
        let link = new Link({
          link: unique(35),
          user: user._id
        });

        link.save().then(() => {
          res.json({ type: 2, text: 0 });
        });
      }).catch(() => {
        res.json({ type: 0, text: 0 });
      });
    }

    else {
      res.json({ type: 0, text: 0 });
    }
  }

  else {
    res.json({ type: 0, text: 0 });
  }
});

export default router;
