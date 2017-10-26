export default (res, data) => {
  res.status(404);

  res.render('404.njk', data);
};
