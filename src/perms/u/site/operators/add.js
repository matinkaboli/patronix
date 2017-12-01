const { Site } = rootRequire('./models');

export default (req, res, next) => {
  Site.findOne({ _id: req.params.id }).then(site => {
    if (site.operators.length < 2) {
      next();
    } else {
      res.reply.error();
    }
  });
};
