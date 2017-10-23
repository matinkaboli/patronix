import { Router } from 'express';

const router = new Router();

router.get('/login', (req, res) => {
  res.render('login.njk');
});

export default router;
