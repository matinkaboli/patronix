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
  User.findOne({
    email: req.body.email,
    status: { $in: [0, 1, 2] }
  }).then(user => {
    if (user) {
      if (user.status === 0) {
        res.json({
          status: 'e',
          code: 0
        });
        // unverified user
      }

      else if (
        user.status === 1 &&
        decrypt(user.password, user.email + dbkey)
      ) {
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
              res.json({ status: 's' });
            }).catch(() => {
              res.json({
                status: 'e',
                code: 3
              });
            });
          } else {
            req.user.login(user);
            res.json({ status: 's' });
          }
        }).catch(() => {
          res.json({
            status: 'e',
            code: 3
          });
        });
      }

      else if (user.status === 2) {
        res.json({
          status: 'e',
          code: 1
        });
        // account has expired
      }
    }

    else {
      res.json({
        status: 'e',
        code: 2
      });
      // no such user
    }
  }).catch(() => {
    res.json({
      status: 'e',
      code: 3
    });
  });
});

export default router;
