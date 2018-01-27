import { Router } from 'express';

const perms = rootRequire('./perms');
const middles = rootRequire('./middles');

const router = new Router();

router.get(
  '/u/chat/:id',
  middles.u.chats.getChat,
  perms.logged,
  perms.u.chat.canSee,
  (req, res) => {
    res.render('u/chat/chat.njk', { chat: req.middle.chat });
  }
);

export default router;
