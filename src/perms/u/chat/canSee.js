export default (req, res, next) => {
  let sites = req.user.user.sites.map(item => item.toString());

  if (
    sites.includes(req.middle.chat.site.toString()) &&
    !req.middle.chat.operator.socketId
  ) {
    next();
  } else {
    res.reply.forbidden();
  }
};
