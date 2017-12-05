import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get(
  '/u/chat',
  perms.logged,
  (req, res) => {
    res.render('u/chat.njk');
  }
);

export default router;
