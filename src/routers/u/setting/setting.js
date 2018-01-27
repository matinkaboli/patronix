import { Router } from 'express';

const router = new Router();
const { logged } = rootRequire('./perms');
const { User } = rootRequire('./models');

router.get('/u/setting', logged, (req, res) => {
  User.findOne({ _id: req.user.user._id }).then(user => {
    if (user) {
      res.render('u/setting/setting.njk', { user });
    }
  });
});

router.post('/u/setting', logged, (req, res) => {
  if (req.body.email &&
      req.body.fname &&
      req.body.lname
  ) {
    req.body.email = req.body.email.toLowerCase();

    User.findOne({ _id: req.user.user._id }).then(user => {
      if (user) {
        user.name.first = req.body.fname;
        user.name.last = req.body.lname;

        if (user.email === req.body.email) {
          user.name.first = req.body.fname;
          user.name.last = req.body.lname;

          user.save().then(() => {
            res.json({ type: 2, text: 0 });
          }).catch(() => {
            res.json({ type: 0, text: 0 });
          });
        } else {
          User.findOne({ email: req.body.email }).then(userEmail => {
            if (userEmail) {
              res.json({ type: 0, text: 0 });
            }

            else {
              user.name.first = req.body.fname;
              user.name.last = req.body.lname;
              user.email = req.body.email;

              user.save().then(() => {
                res.json({ type: 2, text: 0 });
              }).catch(() => {
                res.json({ type: 0, text: 0 });
              });
            }
          });
        }
      }
    });
  }
});

export default router;
