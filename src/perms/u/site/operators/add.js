const { Site, User } = rootRequire('./models');

function isUnique(array, unique) {
  for (let item of array) {
    if (unique.toString() === item.toString()) {
      return false;
    }
  }

  return true;
}

export default (req, res, next) => {
  Site.findById(req.params.id).then(site => {
    if (site.operators.length < 6) {
      User.findOne({ email: req.body.email }).then(user => {
        if (isUnique(site.operators, user._id)) {
          next();
        } else {
          res.reply.error();
        }
      });
    } else {
      res.reply.error();
    }
  });
};
