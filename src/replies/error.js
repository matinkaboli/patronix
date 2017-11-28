export default (res, data) => {
  res.status(500);

  res.render('replies/500.njk', data);
};
