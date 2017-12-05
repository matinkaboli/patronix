import { Router } from 'express';
import RateLimit from 'express-rate-limit';

const { User, Session } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { decrypt } = rootRequire('./utils/crypt');
const { dbkey } = rootRequire('./config.json');

const router = new Router();

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 50,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/login', login, (req, res) => {
  res.render('login.njk');
});

router.post('/login', login, limiter, (req, res) => {
  if (req.body.email && req.body.password) {
    req.body.email = req.body.email.toLowerCase();
    User.findOne({
      email: req.body.email,
      status: { $in: [0, 1, 2] }
    }).then(user => {
      if (user) {
        if (user.status === 0) {
          req.flash('email', req.body.email);
          res.json({ type: 'e', code: 0 });
          // unverified user
        }

        else if (user.status === 1) {
          if (decrypt(user.password, user.email + dbkey)
          === req.body.password) {
            Session.findOne(
              { session: new RegExp(user._id.toString()) }
            ).lean().then(session => {
              if (session) {
                let parsed = JSON.parse(session.session);
                parsed.user = null;

                Session.update(
                  {
                    session: new RegExp(user._id.toString())
                  },
                  {
                    $set: {
                      session: JSON.stringify(parsed)
                    }
                  }
                ).then(() => {
                  req.user.login(user);
                  res.json({ type: 's' });
                  // success
                }).catch(() => {
                  res.json({ type: 'e', code: 3 });
                  // error
                });
              } else {
                req.user.login(user);
                res.json({ type: 's' });
                // success
              }
            }).catch(() => {
              res.json({ type: 'e', code: 3 });
              // error
            });
          } else {
            res.json({ type: 'e', code: 2 });
            // wrong pass
          }
        }

        else if (user.status === 2) {
          res.json({ type: 'e', code: 1 });
          // account has expired
        }
      }

      else {
        res.json({ type: 'e', code: 2 });
        // no such user
      }
    }).catch(() => {
      res.json({ type: 'e', code: 3 });
      // error
    });
  } else {
    res.json({ type: 'e', code: 3 });
    // error
  }
});

export default router;
