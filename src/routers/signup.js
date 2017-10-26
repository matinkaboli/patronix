import { Router } from 'express';
import User from '../models/User';
import { encrypt } from '../utils/encrypt';

const router = new Router();

router.get('/signup', (req, res) => {
  res.render('signup.njk');
});
router.post('/signup', (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const user = new User({
    password: encrypt(req.body.password, req.body.email),
    type: 1,
    status: 0,
    activationLink: 'test code',
    email: req.body.email,
    name: {
      first: req.body.fname,
      last: req.body.lname
    }
  });

  user.save().then(() => {
      res.send('Good Job');
  }).catch(e => {
      res.json(e);
  });
});

export default router;
