import { Router } from 'express';
import { Code, User } from '../models';

const router = new Router();

router.get('/code', (req, res) => {
  res.render('code.njk');
});
router.post('/code', (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      if (user.status === 0) {
        Code.findOne({
          user: user._id,
          code: req.body.code
        }).then(code => {
          if (code) {
            user.status = 1;
            user.save().then(() => {
              res.send('Done');
              // Remove code document
            });
          } else {
            res.send('We have to create a new code for you.');
          }
        });
      } else {
        res.send('Your account has verified before.');
      }
    } else {
      res.send('There is not such username');
    }
  });
});
export default router;
