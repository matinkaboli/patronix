import { Router } from 'express';

const perms = rootRequire('./perms');
const { Site, Chat } = rootRequire('./models');

const router = new Router();

router.get(
  '/u/chats',
  perms.logged,
  (req, res) => {
    Site.find(
      { operators: { $in: [req.user.user._id] } }, { _id: 1 }
    ).then(sites => {
      let ids = [];
      for (let site of sites) {
        ids.push(site._id);
      }

      Chat
      .find({ site: { $in: ids }, taken: false })
      .populate('site')
      .exec()
      .then(chats => {
        res.render('u/chats/chats.njk', { chats });
      });
    });
  }
);

export default router;
