export default res => new Promise(resolve => {
  if (res === 'error' || res.errors) {
    resolve('error');
    return;
  }

  for (let value of Object.values(res.data)) {
    if (!value) {
      resolve('notfound');
      return;
    }
  }

  resolve('success');
});
