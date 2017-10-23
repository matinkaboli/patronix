import { Router } from 'express';

const router = new Router();

router.get('/login', (req, res) => {
  res.render('login.njk');
});

router.post('/login', (req, res) => {
  res.json(req.body);
});

export default router;
