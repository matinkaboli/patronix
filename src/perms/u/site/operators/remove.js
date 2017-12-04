export default (req, res, next) => {
  req.user.user._id.toString() === req.body.id ? res.reply.error() : next();
};
