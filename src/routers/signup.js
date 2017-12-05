import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { unique } from 'stringing';
import svgCaptcha from 'svg-captcha';

// import send from '../utils/mail';
import { User, Link } from '../models';
const { encrypt } = rootRequire('./utils/crypt');
const { login } = rootRequire('./perms');
const { dbkey } = rootRequire('./config.json');

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
  if (req.body.email &&
      req.body.fname &&
      req.body.lname &&
      req.body.password &&
      req.body.captcha
  ) {
    req.body.email = req.body.email.toLowerCase();

    if (req.body.captcha.toLowerCase() === req.session.captcha) {
      User.findOne({ email: req.body.email }).then(doc => {

        if (doc) {
          res.json({ status: 'e', code: 0 });
          // email taken
        }
        else {
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
            const link = new Link({ link: unique(25), user: user._id });

            link.save().then(() => {
              req.session.captcha = null;

              // send(req.body.email, newCode.link, 'signup', req.body.fname);
              res.json({ status: 's' });
              // success
            }).catch(() => {
              res.json({ status: 'e', code: 1 });
              // error
            });
          }).catch(() => {
            res.json({ status: 'e', code: 1 });
            // error
          });
        }
      });
    } else {
      res.json({ status: 'e', code: 2 });
      // wrong captcha
    }
  } else {
    res.json({ status: 'e', code: 1 });
    // error
  }
});

export default router;
