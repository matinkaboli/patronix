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

router.get('/forgot/changepass/:code', login, (req, res) => {
  if (req.params.code) {
    Link.findOne({ link: req.params.code }).then(code => {
      if (code) {
        res.render('forgot/changepass.njk', {
          code: req.params.code
        });
      }
      else {
        res.reply.notFound();
      }
    }).catch(() => {
      res.reply.notFound();
    });
  } else {
    res.reply.notFound();
  }
});

router.post('/forgot/changepass', login, limiter, (req, res) => {
  if (req.body.code) {
    Link.findOne({ link: req.body.code }).then(code => {
      if (code) {
        User.findOne({ _id: code.user }).then(user => {
          if (user) {
            user.password =
            encrypt(req.body.password, user.email + dbkey);

            user.save().then(() => {
              Link.remove({ link: req.body.code }).then(() => {
                req.flash('s', '0');
                req.flash('email', user.email);

                res.json({ type: 's' });
              }).catch(() => {
                req.flash('e', '1');
                res.redirect('/login');
                // error
              });
            }).catch(() => {
              req.flash('e', '1');
              res.redirect('/login');
              // error
            });
          } else {
            req.flash('e', '2');
            res.redirect('/signup');
            // no such user
          }
        }).catch(() => {
          req.flash('e', '1');
          res.redirect('/login');
          // error
        });
      } else {
        res.reply.notFound();
      }
    }).catch(() => {
      req.flash('e', '1');
      res.redirect('/login');
      // error
    });
  } else {
    res.reply.notFound();
  }
});

export default router;
