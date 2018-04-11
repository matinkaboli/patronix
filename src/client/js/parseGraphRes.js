export default res => new Promise(resolve => {
  if (res === 'error' || res.errors) {
    resolve(404);
    return;
  }

  for (let value of Object.values(res.data)) {
    if (!value) {
      resolve(404);
      return;
    }
  }

  resolve(200);
});
