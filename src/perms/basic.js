export default (req, res, next) => {
  req.user.logged() ? next() : res.reply.forbidden();
};
