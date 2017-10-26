export default (res, data) => {
  res.status(500);

  res.render('500.njk', data);
};
