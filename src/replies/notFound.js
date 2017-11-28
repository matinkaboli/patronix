export default (res, data) => {
  res.status(404);

  res.render('replies/404.njk', data);
};
