export default (res, data) => {
  res.status(403);

  res.render('replies/403.njk', data);
};
