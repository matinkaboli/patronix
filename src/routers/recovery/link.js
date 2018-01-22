import { Router } from 'express';
import RateLimit from 'express-rate-limit';

const router = new Router();
const { User, Link } = rootRequire('./models');
const { encrypt } = rootRequire('./utils/crypt');
const { login } = rootRequire('./perms');
const { dbkey } = rootRequire('./config.json');

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 10,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/recovery/:link', login, (req, res) => {
  Link.findOne({ link: req.params.link }).then(link => {
    if (link) {
      res.render('recovery/link.njk', {
        link: req.params.link
      });
    }
    else {
      res.reply.notFound();
    }
  });
});

router.post('/recovery/:link', login, limiter, (req, res) => {
  Link.findOne({ link: req.body.link }).then(link => {
    if (link) {
      User.findOne({ _id: link.user }).then(user => {
        user.password =
        encrypt(req.body.password, user.email + dbkey);

        user.save().then(() => {
          Link.remove({ link: req.body.link }).then(() => {
            res.json({ type: 2, text: 0 });
          });
        });
      });
    } else {
      res.reply.notFound();
    }
  });
});

export default router;
