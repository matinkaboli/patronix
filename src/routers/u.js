import { Router } from 'express';
import { auth } from '../utils/UserManager';
import { User } from '../models';

const router = new Router();

router.get('/u', auth, (req, res) => {
  User.findOne({ _id: req.session.user }).then(user => {
    console.log(user);
    res.render('u.njk', { user });
  }).catch(() => {
    req.flash('error', 'خطا! بعدا امتحان کنید.');
    res.redirect('/login');
  });
});

export default router;
