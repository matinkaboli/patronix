import { Router } from 'express';
import User from '../models/User';

const router = new Router();

router.get('/signup', (req, res) => {
  res.render('signup.njk');
});
router.post('/signup', (req, res) => {
  const fullName = {
    first: req.body.fname,
    last: req.body.lname
  };
  const addUser = new User({
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    type: 1,
    status: 0,
    activationLink: 'test code',
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
