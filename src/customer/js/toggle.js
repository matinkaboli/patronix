export default (styles, status, namespace = '') => {
  if (status) {
    return styles[namespace] + ' ' + styles[namespace + '-active'];
  }

  return styles[namespace];
};
