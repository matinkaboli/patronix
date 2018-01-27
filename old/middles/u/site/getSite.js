const { Site } = rootRequire('./models');

export default (req, res, next) => {
  Site.findById(req.params.id).then(site => {
    req.middle.site = site;
    next();
  }).catch(() => {
    res.reply.notFound();
  });
};
