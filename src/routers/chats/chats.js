import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get(
  '/u/chats',
  perms.logged,
  (req, res) => {
    res.render('u/chats/chats.njk');
  }
);

export default router;
