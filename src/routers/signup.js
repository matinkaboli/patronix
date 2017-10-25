import { Router } from 'express';
import User from '../models/User';
import { encrypt } from '../utils/encrypt';

const router = new Router();

router.get('/signup', (req, res) => {
  res.render('signup.njk');
});
router.post('/signup', (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const fullName = {
    first: req.body.fname,
    last: req.body.lname
  };
  const addUser = new User({
    password: encrypt(password, email),
    type: 1,
    status: 0,
    activationLink: 'test code',
    email,
    fullName
  });
  addUser.save()
    .then(() => {
      res.send('Good Job');
    })
    .catch(e => {
      res.json(e);
    });
});

export default router;
