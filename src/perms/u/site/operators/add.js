const { User } = rootRequire('./models');

export default (req, res, next) => {
  let site = req.middle.site;
  if (site.operators.length < 3) {
    User.findOne({ email: req.body.email }, { operators: 1 }).then(user => {
      if (user) {
        let isUnique = true;
        for (let operator of site.operators) {
          if (user._id.toString() === operator.toString()) {
            isUnique = false;
            break;
          }
        }

        if (isUnique) {
          next();
        } else {
          res.json({ type: 0, text: 0 });
        }
      }

      else {
        res.json({ type: 0, text: 0 });
      }
    });
  } else {
    res.reply.error();
  }
};
