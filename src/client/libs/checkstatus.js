const checkStatus = a => {
  if (200 <= a.status && 300 > a.status) {
    return a;
  }
  const b = new Error(a.statusText);
  throw b.res = a, b;
};

export default checkStatus;
