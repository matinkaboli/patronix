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
        }).then(code => {
          if (code) {
            if (code.code === req.body.code) {
              user.status = 1;
              user.save().then(() => {
                res.reply.ok({
                  message: 'Done'
                });
                // Remove code document
              });
            } else {
              res.reply.ok({
                message: 'Wrong, You wanna resend?'
              });
            }
          } else {
            res.reply.error({
              message: 'We have to create a new code for you.'
            });
          }
        });
      } else {
        res.reply.ok({
          message: 'Your account has verified before.'
        });
      }
    } else {
      res.reply.ok({
        message: 'There is no such username'
      });
    }
  });
});
export default router;
