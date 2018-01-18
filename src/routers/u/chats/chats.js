import { Router } from 'express';

const perms = rootRequire('./perms');
const { Chat } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/chats',
  perms.logged,
  (req, res) => {
    Chat
    .find({ site: { $in: req.user.user.sites }, done: false, take: false })
    .populate('site')
    .exec()
    .then(chats => {
      res.render('u/chats/chats.njk', { chats });
    });
  }
);

export default router;
