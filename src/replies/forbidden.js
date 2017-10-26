export default (res, data) => {
  res.status(403);

  res.render('403.njk', data);
};
