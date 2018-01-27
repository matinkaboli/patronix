import { Router } from 'express';

const perms = rootRequire('./perms');
const { encrypt } = rootRequire('./utils/crypt');
const { socketkey } = rootRequire('./config.json');

const router = new Router();

router.post(
  '/u/generate',
  perms.logged,
  (req, res) => {
    res.send(encrypt(req.user.user._id.toString(), socketkey));
  }
);

export default router;
