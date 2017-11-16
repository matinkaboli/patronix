import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Code } from '../models';
import { unique } from 'stringing';
// import send from '../utils/mail';
import { logged } from '../utils/UserManager';

const router = new Router();

const forgotLimit = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/forgot', logged, (req, res) => {
  res.render('forgot.njk', {
    email: req.flash('email'),
    erorr: req.flash('error'),
    warn: req.flash('warn')
  });
});
router.post('/forgot', forgotLimit, logged, (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      Code.findOne({ user: user._id }).then(code => {
        if (code) {
          // send(req.body.email, code.code, 'forgot', user.fname);
          req.flash('success', 'ایمیل برای شما با موفقیت فرستاده شد');
          res.redirect('/login');
        } else {
          const newCode = new Code({
            code: unique(25),
            user: user._id
          });
          newCode.save().then(() => {
            // send(req.body.email, code.code, 'forgot', user.fname);
            res.render('done.njk', {
              type: 'forgot',
              email: req.body.email
            });
          }).catch(() => {
            req.flash('error', 'خطا، بعدا امتحان کنید.');
            res.redirect('/forgot');
          });
        }
      }).catch(() => {
        req.flash('error', 'خطا، بعدا امتحان کنید.');
        res.redirect('/forgot');
      });
    } else {
      req.flash('error', 'چنین حسابی وجود ندارد.');
      res.redirect('/signup');
    }
  }).catch(() => {
    req.flash('error', 'خطا، بعدا امتحان کنید.');
    res.redirect('/forgot');
  });
});

export default router;
