export default (req, res, next) => {
  req.user.logged() ? res.redirect('/u') : next();
};
