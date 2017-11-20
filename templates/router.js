import { Router } from 'express';

const { perm } = rootRequire('./perms');

const router = new Router();

router.get('/@@replacement@@', perm, (req, res) => {
});

export default router;
