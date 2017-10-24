import { Router } from 'express';
import RateLimit from 'express-rate-limit';

const router = new Router();

const loginLimiter = new RateLimit({
  windowMs: 1000 * 60 * 60 * 3,
  max: 50,
  delayMs: 300,
  handler(req, res) {
    res.render('too_many_req.njk');
  }
});

router.get('/login', (req, res) => {
  res.render('login.njk');
});

router.post('/login', loginLimiter, (req, res) => {
  res.json(req.body);
});

export default router;
