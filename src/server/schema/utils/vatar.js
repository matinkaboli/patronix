export default data => {
  if (data.avatar) {
    data.avatar = '/static/uploads/' + data.avatar;
  }

  return data;
};
