import { Router } from 'express';

const perms = rootRequire('./perms');
const middles = rootRequire('./middles');

const router = new Router();

router.get(
  '/u/chats/:id',
  middles.u.chats.getChat,
  perms.logged,
  perms.u.chats.canTake,
  (req, res) => {
    res.render('u/chats/chat.njk');
  }
);

export default router;
