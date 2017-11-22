const { Site } = rootRequire('./models');

export default (req, res, next) => {
  Site.findOne({ _id: req.body.id }).then(site => {
    site.owner.toString() === req.user.user._id.toString() ?
    next() :
    res.reply.forbidden();
  });
};
