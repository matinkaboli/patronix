import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';
import svgCaptcha from 'svg-captcha';

// import send from '../utils/mail';
const { User, Link }  = rootRequire('./models');
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
  svgCaptcha.options.width = 220;

  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1ilIQ8',
    noise: 4
  });

  req.session.captcha = captcha.text.toLowerCase();

  res.render('signup.njk', { captcha: captcha.data });
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
          res.reply.ok();
        });
      }).catch(() => {
        res.reply.error();
      });
    }

    else {
      res.reply.error();
    }
  }

  else {
    res.reply.error();
  }
});

export default router;
