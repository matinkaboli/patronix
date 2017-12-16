import { Router } from 'express';
import svgCaptcha from 'svg-captcha';

const router = new Router();

router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1ilIQ8',
    noise: 1,
    color: true
  });


  req.session.captcha = captcha.text.toLowerCase();
  res.json({ captcha: captcha.data });
});

export default router;
