export default (res, data) => {
  res.status(200);

  res.render('replies/200.njk', data);
};
