import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.render('home.njk');
});

export default router;
