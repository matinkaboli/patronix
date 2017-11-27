const { Site } = rootRequire('./models');

export default (req, res, next) => {
  Site.find({ owner: req.user.user._id }).then(doc => {
    doc.length === 0 ? next() : res.reply.forbidden();
  });
};
