import { Router } from 'express';

const router = new Router();
const { logged } = rootRequire('./perms');
const { User } = rootRequire('./models');
const { encrypt } = rootRequire('./utils');

router.post('/u/setting/password', logged, (req, res) => {
  if (req.body.oldpass && req.body.newpass) {
    User.findOne({ _id: req.user.user._id }).then(user => {
      if (user) {
        if (encrypt(req.body.oldpass, user.email) === user.password) {
          user.password = encrypt(req.body.newpass, user.email);

          user.save().then(() => {
            res.json({ type: 2, text: 0 });
          });
        }
        else {
          res.json({ type: 0, text: 0 });
        }
      } else {
        res.json({ type: 0, text: 0 });
      }
    });
  } else {
    res.json({ type: 0, text: 0 });
  }
});

export default router;
