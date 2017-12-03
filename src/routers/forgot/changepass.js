import { Router } from 'express';
import RateLimit from 'express-rate-limit';

const router = new Router();
const { User, Link } = rootRequire('./models');
const { encrypt } = rootRequire('./utils');
const { login } = rootRequire('./perms');

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/forgot/changepass/:code', login, (req, res) => {
  if (req.params.code) {
    Link.findOne({ link: req.params.code }).then(code => {
      if (code) {
        res.render('changepass.njk', {
          email: req.flash('email'),
          error: req.flash('error'),
          warn: req.flash('warn'),
          code: req.params.code
        });
      }
      else {
        res.reply.notFound();
      }
    }).catch(() => {
      res.reply.error({ message: 'خطا! بعدا امتحان کنید. ' });
    });
  } else {
    res.reply.error({ message: 'خطا! بعدا امتحان کنید. ' });
  }
});

router.post('/forgot/changepass', login, limiter, (req, res) => {
  if (req.body.code) {
    Link.findOne({ link: req.body.code }).then(code => {
      if (code) {
        User.findOne({ _id: code.user }).then(user => {
          if (user) {
            user.password = encrypt(req.body.password, user.email);

            user.save().then(() => {
              Link.remove({ link: req.body.code }).then(() => {
                req.flash('success', 'رمز با موفقیت تغییر یافت');
                req.flash('email', user.email);

                res.redirect('/login');
              }).catch(() => {
                res.reply.error({ message: 'Error, Try Again! '});
              });
            }).catch(() => {
              console.log(1);
              req.flash('error', 'خطا! بعدا امتحان کنید');
              res.redirect('/forgot');
            });
          } else {
            req.flash('error', 'چنین حسابی وجود ندارد.');
            res.redirect('/signup');
          }
        }).catch(() => {
          console.log(2);
          req.flash('error', 'خطا! بعدا امتحان کنید.');
          res.redirect('/forgot');
        });
      } else {
        console.log(3);
        req.flash('error', 'کد معتبر نمیباشد');
        res.redirect('/forgot');
      }
    }).catch(() => {
      console.log(4);
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/forgot');
    });
  } else {
    console.log(5);
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/forgot');
  }
});

export default router;
