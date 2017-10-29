import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import send from '../utils/mail';
import { generate } from 'stringing';
import svgCaptcha from 'svg-captcha';
import { User, Code } from '../models';
import { encrypt } from '../utils/encrypt';
const router = new Router();

const signupLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 30,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});
const recaptchaLimiter = new RateLimit({
  windowMs: 1000 * 60 * 10,
  max: 150,
});

router.get('/recaptcha', recaptchaLimiter, (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: '0o1ilIQ8',
    noise: 4
  });
  req.session.captcha = captcha.text;
  res.json({ captcha: captcha.data });
});
router.get('/signup', (req, res) => {
  svgCaptcha.options.width = 220;
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: '0o1ilIQ8',
    noise: 4
  });
  req.session.captcha = captcha.text;
  res.render('signup.njk', {
    error: req.flash('error'),
    captcha: captcha.data
  });
});

router.post('/signup', signupLimiter, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  if (req.body.captcha === req.session.captcha) {
    User.findOne({
      email: req.body.email,
      password: encrypt(req.body.password, req.body.email)
    }).then(doc => {
      if (doc) {
        req.flash('error', 'این ایمیل توسط کسی ثبت نام شده.');
        res.redirect('/signup');
      } else {
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

        user.save().then(() => {
          const newCode = new Code({
            code: generate(6, { lower: 1, number: 1 }),
            user: user._id
          });
          newCode.save().then(() => {
            send(req.body.email, newCode.code, 'signup', req.body.fname);
            req.flash(
              'success',
              'حساب کاربری شما با موفقیت ساخته شد.');
            req.flash('email', req.body.email);
            res.redirect('/code');
          }).catch(() => {
            req.flash('error', 'مشکلی پیش آمده، دوباره امتحان کنید');
            res.redirect('/login');
          });
        }).catch(() => {
          req.flash('error', 'مشکلی پیش آمده، دوباره امتحان کنید');
          res.redirect('/signup');
        });
      }
    });
  } else {
    req.flash('error', 'کد امنیتی وارد شده اشتباه است.');
    res.redirect('/signup');
  }
});

export default router;
