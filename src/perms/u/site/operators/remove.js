export default (req, res, next) => {
  req.user.user._id.toString() === req.body.id ?
  res.json({ type: 0, text: 0 }) : next();
};
