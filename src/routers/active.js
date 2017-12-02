import { Router } from 'express';
import { Link, User } from '../models';
import RateLimit from 'express-rate-limit';

const router = new Router();
const { login } = rootRequire('./perms');

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 50,
  delayMs: 0,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/active/:link', login, limiter, (req, res) => {
  if (req.params.link) {
    Link.findOne({ link: req.params.link }).then(link => {
      if (link) {
        User.findOne({ _id: link.user }).then(user => {
          if (user) {
            user.status = 1;

            user.save().then(() => {
              Link.remove({ link: req.params.link }).then(() => {
                req.flash('success', 'حساب شما با موفقیت تایید گردید.');
                req.flash('email', user.email);

                res.redirect('/login');
              }).catch(() => {
                req.flash('error', 'خطا! بعدا امتحان کنید.');
                res.redirect('/login');
              });
            }).catch(() => {
              req.flash('error', 'خطا! بعدا امتحان کنید.');
              res.redirect('/login');
            });
          } else {
            req.flash('error', 'چنین حسابی وجود ندارد.');
            res.redirect('/signup');
          }
        }).catch(() => {
          req.flash('error', 'خطا! بعدا امتحان کنید.');
          res.redirect('/login');
        });
      }
      else {
        res.reply.notFound();
      }
    }).catch(() => {
      req.flash('error', 'خطا! بعدا امتحان کنید.');
      res.redirect('/login');
    });
  } else {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/login');
  }
});

export default router;
