import { Router } from 'express';
import svgCaptcha from 'svg-captcha';
import RateLimit from 'express-rate-limit';

const router = new Router();

const limiter = new RateLimit({
  windowMs: 1000 * 60 * 10,
  max: 150,
});

router.get('/recaptcha', limiter, (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1ilIQ8',
    noise: 4
  });

  req.session.captcha = captcha.text.toLowerCase();
  res.json({ captcha: captcha.data });
});

export default router;
