import { Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { User, Token } from './models';
import { jwtkey as key } from './config';

let router = new Router();

router.post('/login', async(req, res) => {
  req.session.logged = true;
  let user = await User.findOne(req.body);

  if (user) {
    let token = await Token.findOne({ user: user._id });

    if (token) {
      await token.remove();
    }

    token = new Token({
      user: user._id,
      token: sign({ id: user._id }, key, { expiresIn: '7d' })
    });

    await token.save();

    res.send({ status: true });
  }

  else {
    res.send({ status: false });
  }
});

export default router;
