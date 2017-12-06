const { User } = rootRequire('./models');

export default (req, res, next) => {
  let site = req.middle.site;
  if (site.operators.length < 3) {
    User.findOne({ email: req.body.email }).then(user => {
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
        res.reply.error();
      }
    });
  } else {
    res.reply.error();
  }
};
