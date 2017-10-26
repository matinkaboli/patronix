export default (res, data) => {
  res.status(200);

  res.render('200.njk', data);
};
