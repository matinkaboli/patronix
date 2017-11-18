import { Router } from 'express';
import { auth } from '../utils/UserManager';
import { User } from '../models';

const router = new Router();

router.get('/u', auth, (req, res) => {

  if (req.session.user) {
    User.findOne({ _id: req.session.user }).then(user => {
      if (user) {
        res.render('u.njk', {
          error: req.flash('error'),
          success: req.flash('success'),
          warn: req.flash('warn'),
          user
        });
      }
      else {
        req.flash('erorr', 'خطا! بعدا امتحان کنید.');
        res.redirect('/u');
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
