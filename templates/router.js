import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get('/@@replacement@@', perms, (req, res) => {
});

export default router;
