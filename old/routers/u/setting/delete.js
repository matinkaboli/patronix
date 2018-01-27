import { Router } from 'express';

const router = new Router();
const { logged } = rootRequire('./perms');
const { User } = rootRequire('./models');

router.post('/u/setting/delete', logged, (req, res) => {
  User.remove({ _id: req.user.user._id }).then(() => {
    res.json({ type: 2, text: 0 });
  });
});

export default router;
