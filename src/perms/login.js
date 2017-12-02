export default (req, res, next) => {
  req.user.logged() ? res.reply.forbidden() : next();
};
