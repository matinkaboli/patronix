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
          // unverified user
          res.json({ type: 0, text: 0 });
        }

        else if (user.status === 1) {
          if (
            decrypt(user.password, user.email + dbkey) === req.body.password
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
                  // success
                  req.user.login(user);
                  res.json({ type: 2, text: 0 });
                });
              }

              else {
                // success
                req.user.login(user);
                res.json({ type: 2, text: 0 });
              }
            });
          }

          else {
            // wrong pass
            res.json({ type: 0, text: 2 });
          }
        }

        else if (user.status === 2) {
          // account has expired
          res.json({ type: 0, text: 1 });
        }
      }

      else {
        // no such user
        res.json({ type: 0, text: 2 });
      }
    });
  }

  else {
    // error
    res.json({ type: 0, text: 3 });
  }
});

export default router;
