import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.render('main.njk', {
    success: req.flash('success')
  });
});

export default router;
