const btn = document.getElementById('change-captcha');

btn.addEventListener('click', e => {
  e.preventDefault();
  const svgElement = document.getElementsByTagName('svg')[0];
  fetch('/recaptcha', {
    credentials: 'include'
  }).then(res => res.json()).then(data => {
    svgElement.innerHTML = data.captcha;
  }).catch(() => {
    svgElement.innerHTML = M[0][0];
  });
});
