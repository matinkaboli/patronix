import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.render('home.njk', { logged: req.user.logged() });
});

export default router;
