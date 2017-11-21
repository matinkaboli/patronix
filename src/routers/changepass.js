import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import { User, Link } from '../models';
import { encrypt } from '../utils/encrypt';

const router = new Router();

const changepassLimit = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/changepass/:code', (req, res) => {
  if (req.params.code) {
    Link.findOne({ link: req.params.code }).then(code => {

      if (code) {
        res.render('changepass.njk', {
          email: req.flash('email'),
          error: req.flash('error'),
          warn: req.flash('warn'),
          code: req.params.code
        });
      } else {
        res.reply.notFound();
      }

    }).catch(() => {
      res.reply.error({ message: 'خطا! بعدا امتحان کنید. ' });
    });
  } else {
    res.reply.error({ message: 'خطا! بعدا امتحان کنید. ' });
  }
});

router.post('/changepass', changepassLimit, (req, res) => {
  if (req.body.code) {
    Link.findOne({ link: req.body.code }).then(code => {
      if (code) {

        User.findOne({ _id: code.user }).then(user => {
          if (user) {

            user.password = encrypt(req.body.password, user.email);

            user.save().then(() => {
              req.flash('success', 'رمز با موفقیت تغییر یافت');
              req.flash('email', user.email);
              res.redirect('/login');
            }).catch(() => {
              req.flash('error', 'خطا! بعدا امتحان کنید');
              res.redirect('/changepass');
            });
          } else {
            req.flash('error', 'چنین حسابی وجود ندارد.');
            res.redirect('/signup');
          }
        }).catch(() => {
          req.flash('error', 'خطا! بعدا امتحان کنید.');
          res.redirect('/changepass');
        });
      } else {
        req.flash('error', 'کد معتبر نمیباشد');
        res.redirect('/changepass');
      }
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/changepass');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/changepass');
  }
});

export default router;
