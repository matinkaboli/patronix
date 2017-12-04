const { Site, User } = rootRequire('./models');

export default (req, res, next) => {
  Site.findById(req.params.id).then(site => {
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
      }).catch(e => console.log(e));
    } else {
      res.reply.error();
    }
  });
};
