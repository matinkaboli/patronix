import { Router } from 'express';
import { basic } from '../perms';

const router = new Router();

router.get('/u/sites/add', basic, (req, res) => {
  res.send('a');
});

export default router;
