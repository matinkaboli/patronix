import { Router } from 'express';
import { Link, User } from '../models';
import RateLimit from 'express-rate-limit';

const router = new Router();
const { login } = rootRequire('./perms');

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 50,
  delayMs: 0,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/activate/:link', login, limiter, (req, res) => {
  Link.findOne({ link: req.params.link }).then(link => {
    if (link) {
      User.findOne({ _id: link.user }).then(user => {
        user.status = 1;

        user.save().then(() => {
          Link.remove({ link: req.params.link }).then(() => {
            res.redirect('/login');
          });
        });
      });
    }

    else {
      res.reply.notFound();
    }
  });
});

export default router;
