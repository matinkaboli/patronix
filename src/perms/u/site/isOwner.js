const { Site } = rootRequire('./models');

export default (req, res, next) => {
  Site.findOne({ _id: req.params.id, owner: req.user.user._id }).then(site => {
    site ? next() : res.reply.forbidden();
  });
};
